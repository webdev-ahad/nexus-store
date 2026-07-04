import { memo, useMemo } from 'react'
import {
  ChevronRight,
  Gamepad2,
  Headphones,
  LayoutGrid,
  Monitor,
  Mouse,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { categoryGroups, countProductsInGroup } from '../../data/categories'
import { products } from '../../data/Products'
import SectionShell from '../ui/SectionShell'
import SectionHeader from '../ui/SectionHeader'
import { cardActive, cardBase, cardHover, countBadge, countBadgeActive, iconBox, iconBoxActive } from '../ui/styles'

type CategoriesSectionProps = {
  activeCategory: string | null
  onSelectCategory: (groupId: string | null) => void
}

const categoryIcons: Record<string, LucideIcon> = {
  'mice-keyboards': Mouse,
  audio: Headphones,
  displays: Monitor,
  streaming: Video,
  accessories: Gamepad2,
}

const CategoriesSection = memo(({ activeCategory, onSelectCategory }: CategoriesSectionProps) => {
  const productCategories = useMemo(() => products.map((p) => p.category), [])
  const totalProducts = products.length

  const cards = useMemo(
    () => [
      {
        id: null as string | null,
        label: 'All gear',
        description: 'Browse the full Nexus collection',
        Icon: LayoutGrid,
        count: totalProducts,
      },
      ...categoryGroups.map((group) => ({
        id: group.id,
        label: group.label,
        description: group.description,
        Icon: categoryIcons[group.id] ?? LayoutGrid,
        count: countProductsInGroup(group.id, productCategories),
      })),
    ],
    [productCategories, totalProducts]
  )

  return (
    <SectionShell id="categories" gradient="bottom">
      <SectionHeader
        label="Browse"
        title="Shop by category"
        description="Filter the collection instantly — pick a category to jump straight to the gear you need."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => {
          const isActive = activeCategory === card.id
          const { Icon } = card

          return (
            <button
              key={card.id ?? 'all'}
              type="button"
              onClick={() => onSelectCategory(card.id)}
              aria-pressed={isActive}
              className={`group flex cursor-pointer items-center gap-4 p-4 text-left animate-fade-in-up sm:p-5 ${cardBase} ${
                isActive ? cardActive : cardHover
              }`}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className={`${iconBox} transition ${isActive ? iconBoxActive : 'group-hover:border-purple-500/20 group-hover:bg-purple-500/15'}`}>
                <Icon
                  className={`h-5 w-5 ${isActive ? 'text-purple-300' : 'text-purple-400'}`}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">{card.label}</p>
                  <span className={isActive ? countBadgeActive : countBadge}>{card.count}</span>
                </div>
                <p className="mt-0.5 truncate text-sm text-zinc-500">{card.description}</p>
              </div>

              <ChevronRight
                className={`h-4 w-4 shrink-0 transition ${
                  isActive
                    ? 'text-purple-400'
                    : 'text-zinc-600 group-hover:translate-x-0.5 group-hover:text-zinc-400'
                }`}
                aria-hidden="true"
              />
            </button>
          )
        })}
      </div>
    </SectionShell>
  )
})

CategoriesSection.displayName = 'CategoriesSection'

export default CategoriesSection
