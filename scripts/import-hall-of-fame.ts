import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { config } from 'dotenv'

// NOTE: hallOfFame has been removed from content.ts as data is now in Firebase
// To use this script, you need to restore the hallOfFame array temporarily or
// import from a backup file. This script is kept for reference/backup purposes.
// For now, we'll show an error message.
const hallOfFame: any[] = []

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

// Helper function to convert score string to liters number
// Examples: "13 Pints" -> 13, "14 Pints" -> 14
function convertScoreToLiters(score: string): number {
  // Extract number from score string
  const match = score.match(/(\d+(?:\.\d+)?)/)
  if (match) {
    return parseFloat(match[1])
  }
  // If no number found, try to parse the whole string
  const numericValue = parseFloat(score)
  if (!isNaN(numericValue)) {
    return numericValue
  }
  console.warn(`⚠️  Could not parse score "${score}", using 0`)
  return 0
}

// Check if entry already exists
async function entryExists(name: string): Promise<boolean> {
  try {
    const q = query(collection(db, 'hallOfFame'), where('name', '==', name))
    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error(`Error checking if entry exists: ${error}`)
    return false
  }
}

async function importHallOfFame() {
  console.log('🚀 Starting Hall of Fame import...\n')
  
  if (hallOfFame.length === 0) {
    console.error('❌ Error: hallOfFame data is not available!')
    console.error('\nThe hallOfFame array has been removed from content.ts')
    console.error('since all Hall of Fame data is now stored in Firebase.')
    console.error('\nTo use this import script:')
    console.error('1. Restore hallOfFame from a backup/version control')
    console.error('2. Or manually add entries through the admin panel at /admin')
    console.error('3. Or create a backup file with the hallOfFame array')
    process.exit(1)
  }
  
  let totalEntries = 0
  let importedEntries = 0
  let skippedEntries = 0
  let errors = 0

  try {
    for (const entry of hallOfFame) {
      totalEntries++
      
      // Check if entry already exists
      const exists = await entryExists(entry.name)
      if (exists) {
        console.log(`  ⏭️  Skipping "${entry.name}" (already exists)`)
        skippedEntries++
        continue
      }

      // Transform entry to Firestore format
      const litters = convertScoreToLiters(entry.score)
      // Use current date as default, or you can modify this to use a specific date
      const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD format

      const firestoreEntry = {
        name: entry.name,
        litters: litters,
        date: date,
        image: entry.image || '',
      }

      try {
        await addDoc(collection(db, 'hallOfFame'), firestoreEntry)
        console.log(`  ✅ Imported: "${entry.name}" (${litters}L)`)
        importedEntries++
      } catch (error) {
        console.error(`  ❌ Error importing "${entry.name}":`, error)
        errors++
      }
    }

    console.log('\n📊 Import Summary:')
    console.log(`   Total entries: ${totalEntries}`)
    console.log(`   ✅ Imported: ${importedEntries}`)
    console.log(`   ⏭️  Skipped (already exist): ${skippedEntries}`)
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
    
    // Then import Hall of Fame entries
    await importHallOfFame()
    
    console.log('\n🎉 All done!')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Unexpected error:', error)
    process.exit(1)
  }
}

main()

