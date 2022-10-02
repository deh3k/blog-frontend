export const dateConvert = (date: string) => {
  const ds = new Date(date)

  const fd = ds.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return fd
}

export const dateTimeConvert = (date: string) => {
  const ds = new Date(date)

  const fd = ds.toLocaleDateString([], {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
  })

  const ft = ds.toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
  })

  return `${fd} ${ft}`
}

