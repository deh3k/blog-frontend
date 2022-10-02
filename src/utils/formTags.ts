export const formatTags = (tags: string) => {
  const tagsArr = tags.split(',').map(tag => tag.replace(/[^a-zа-яё]/gi, '').toLowerCase()).filter(tag => tag.length !== 0).map(tag => '#'.concat(tag))
  return tagsArr
}

