export const buildWhatsAppUrl = (message: string, phone = '554738045222') => {
  const text = encodeURIComponent(message.trim())
  return `https://wa.me/${phone}?text=${text}`
}

export const openWhatsApp = (message: string, phone = '554738045222') => {
  const url = buildWhatsAppUrl(message, phone)
  window.open(url, '_blank', 'noopener,noreferrer')
}

