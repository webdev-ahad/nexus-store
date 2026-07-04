import { memo, useState, useCallback, useEffect } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import SectionShell from '../ui/SectionShell'
import SectionHeader from '../ui/SectionHeader'
import { cardActive, cardBase, cardHover, iconBox, iconBoxActive } from '../ui/styles'

const faqs = [
  {
    id: 'shipping',
    question: 'How long does shipping take?',
    answer:
      'Orders placed before 2 PM ship same day. Standard delivery is 3–5 business days. Free shipping applies to orders over $75.',
  },
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day no-questions-asked return window on all unused products in original packaging. Contact support to start a return.',
  },
  {
    id: 'warranty',
    question: 'Do products come with a warranty?',
    answer:
      'Yes — all peripherals include a minimum 2-year warranty. Premium items like monitors and chairs may include up to 5 years of coverage.',
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. Checkout is secured with 256-bit SSL encryption.',
  },
]

type FAQSectionProps = {
  openFaqId?: string | null
}

const FAQSection = memo(({ openFaqId = null }: FAQSectionProps) => {
  const [openId, setOpenId] = useState<string | null>(openFaqId)

  useEffect(() => {
    if (openFaqId) setOpenId(openFaqId)
  }, [openFaqId])

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <SectionShell id="faq" gradient="top">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          label="Support"
          title="Frequently asked questions"
          description="Quick answers about shipping, returns, warranty, and payments."
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                id={`faq-${faq.id}`}
                className={`overflow-hidden animate-fade-in-up ${cardBase} ${
                  isOpen ? cardActive : cardHover
                }`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left"
                >
                  <div className={`${iconBox} ${isOpen ? iconBoxActive : ''}`}>
                    <HelpCircle
                      className={`h-5 w-5 ${isOpen ? 'text-purple-300' : 'text-purple-400'}`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="min-w-0 flex-1 font-medium text-white">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-purple-400' : 'text-zinc-500'}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/[0.06] px-5 pb-5 pt-1 pl-[4.75rem]">
                    <p className="text-sm leading-7 text-zinc-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
})

FAQSection.displayName = 'FAQSection'

export default FAQSection
