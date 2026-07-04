export type CategoryGroup = {
  id: string
  label: string
  categories: string[]
  description: string
}

export const categoryGroups: CategoryGroup[] = [
  {
    id: 'mice-keyboards',
    label: 'Mice & Keyboards',
    categories: ['Peripherals', 'Gaming Mouse', 'Keyboards'],
    description: 'Precision input for every playstyle',
  },
  {
    id: 'audio',
    label: 'Audio & Headsets',
    categories: ['Audio'],
    description: 'Immersive sound and clear comms',
  },
  {
    id: 'displays',
    label: 'Monitors & Displays',
    categories: ['Displays'],
    description: 'High refresh, low latency panels',
  },
  {
    id: 'streaming',
    label: 'Streaming Gear',
    categories: ['Streaming'],
    description: 'Broadcast-ready cameras and mics',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    categories: ['Accessories', 'Controllers', 'Furniture'],
    description: 'Pads, controllers, and setup essentials',
  },
]

export function matchesCategoryGroup(productCategory: string, groupId: string | null): boolean {
  if (!groupId) return true
  const group = categoryGroups.find((g) => g.id === groupId)
  if (!group) return true
  return group.categories.includes(productCategory)
}

export function countProductsInGroup(
  groupId: string | null,
  productCategories: string[]
): number {
  if (!groupId) return productCategories.length
  const group = categoryGroups.find((g) => g.id === groupId)
  if (!group) return 0
  return productCategories.filter((c) => group.categories.includes(c)).length
}
