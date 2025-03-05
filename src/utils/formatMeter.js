export const formatAddress = (meter) => {
  return [meter.address_1, meter.address_2, meter.address_3, meter.address_4]
    .filter(Boolean) // Remove empty fields
    .join(', ')
}

export const formatMeterStatus = (meter) => {
  return meter.status === 'Active' ? '✅ Active' : '⚠️ Inactive'
}
