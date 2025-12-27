import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { config } from 'dotenv'

// NOTE: menuCategories has been removed from content.ts as data is now in Firebase
// To use this script, you need to restore the menuCategories array temporarily or
// import from a backup file. This script is kept for reference/backup purposes.
// For now, we'll show an error message.
const menuCategories: any[] = []

// Load environment variables
config()

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Error: Firebase configuration is missing!')
  console.error('Please make sure your .env file contains all required Firebase variables.')
  process.exit(1)
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Authenticate with Firebase
async function authenticate() {
  const adminEmail = process.env.FIREBASE_ADMIN_EMAIL
  const adminPassword = process.env.FIREBASE_ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.error('❌ Error: Admin credentials are missing!')
    console.error('Please add FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD to your .env file.')
    console.error('\nThese should be the same credentials you use to login to /admin')
    process.exit(1)
  }

  try {
    console.log('🔐 Authenticating with Firebase...')
    await signInWithEmailAndPassword(auth, adminEmail, adminPassword)
    console.log('✅ Authentication successful!\n')
  } catch (error: any) {
    console.error('❌ Authentication failed:', error.message)
    console.error('\nPlease check:')
    console.error('1. FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD in .env')
    console.error('2. The user exists in Firebase Authentication')
    console.error('3. Email/Password authentication is enabled in Firebase Console')
    process.exit(1)
  }
}

// Helper function to convert price to number
function convertPrice(price: number | string): number {
  if (typeof price === 'number') {
    return price
  }
  
  // Handle string prices like "-", "+7 / +20", etc.
  if (price === '-' || price.trim() === '') {
    return 0 // Use 0 for items without fixed price
  }
  
  // Try to parse numeric strings
  const numericValue = parseFloat(price)
  if (!isNaN(numericValue)) {
    return numericValue
  }
  
  // For complex strings like "+7 / +20", use 0
  return 0
}

// Check if item already exists
async function itemExists(category: string, name: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'menuItems'),
      where('category', '==', category),
      where('name', '==', name)
    )
    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error(`Error checking if item exists: ${error}`)
    return false
  }
}

async function importMenuItems() {
  console.log('🚀 Starting menu import...\n')
  
  if (menuCategories.length === 0) {
    console.error('❌ Error: menuCategories data is not available!')
    console.error('\nThe menuCategories array has been removed from content.ts')
    console.error('since all menu data is now stored in Firebase.')
    console.error('\nTo use this import script:')
    console.error('1. Restore menuCategories from a backup/version control')
    console.error('2. Or manually add items through the admin panel at /admin')
    console.error('3. Or create a backup file with the menuCategories array')
    process.exit(1)
  }
  
  let totalItems = 0
  let importedItems = 0
  let skippedItems = 0
  let errors = 0

  try {
    for (const category of menuCategories) {
      console.log(`📦 Processing category: ${category.name} (${category.id})`)
      
      // Process main category items
      for (const item of category.items) {
        totalItems++
        
        // Check if item already exists
        const exists = await itemExists(category.id, item.name)
        if (exists) {
          console.log(`  ⏭️  Skipping "${item.name}" (already exists)`)
          skippedItems++
          continue
        }

        // Transform item to Firestore format
        const firestoreItem = {
          category: category.id,
          name: item.name,
          description: item.description || '',
          value: convertPrice(item.price),
          img_url: item.image || '',
        }

        try {
          await addDoc(collection(db, 'menuItems'), firestoreItem)
          console.log(`  ✅ Imported: "${item.name}" (R$ ${firestoreItem.value.toFixed(2)})`)
          importedItems++
        } catch (error) {
          console.error(`  ❌ Error importing "${item.name}":`, error)
          errors++
        }
      }
      
      // Process subcategories if they exist
      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          console.log(`  📁 Processing subcategory: ${subcategory.name}`)
          
          for (const item of subcategory.items) {
            totalItems++
            
            // Check if item already exists
            const exists = await itemExists(category.id, item.name)
            if (exists) {
              console.log(`    ⏭️  Skipping "${item.name}" (already exists)`)
              skippedItems++
              continue
            }

            // Transform item to Firestore format
            const firestoreItem = {
              category: category.id,
              name: item.name,
              description: item.description || '',
              value: convertPrice(item.price),
              img_url: item.image || '',
            }

            try {
              await addDoc(collection(db, 'menuItems'), firestoreItem)
              console.log(`    ✅ Imported: "${item.name}" (R$ ${firestoreItem.value.toFixed(2)})`)
              importedItems++
            } catch (error) {
              console.error(`    ❌ Error importing "${item.name}":`, error)
              errors++
            }
          }
        }
      }
      
      console.log('') // Empty line between categories
    }

    console.log('\n📊 Import Summary:')
    console.log(`   Total items: ${totalItems}`)
    console.log(`   ✅ Imported: ${importedItems}`)
    console.log(`   ⏭️  Skipped (already exist): ${skippedItems}`)
    console.log(`   ❌ Errors: ${errors}`)
    console.log('\n✨ Import completed!')
    
  } catch (error) {
    console.error('\n❌ Fatal error during import:', error)
    process.exit(1)
  }
}

// Run the import
async function main() {
  try {
    // Authenticate first
    await authenticate()
    
    // Then import menu items
    await importMenuItems()
    
    console.log('\n🎉 All done!')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Unexpected error:', error)
    process.exit(1)
  }
}

main()

