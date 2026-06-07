import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  contactForm: Form
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
}) => {
  return {
    slug: 'contact',
    title: 'Contact',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'btcSectionIntro',
        eyebrow: 'Get In Touch',
        heading: "Let's Start Your Solar Journey",
        lead: 'Request a free consultation and discover how much you can save with solar energy. Our experts are ready to design the perfect solution for your needs.',
        align: 'center',
        background: 'graphite',
      },
      {
        blockType: 'btcContactSection',
        infoTitle: 'Contact Information',
        showSiteContactDetails: true,
        showSocialLinks: true,
        socialTitle: 'Follow Us',
        formTitle: 'Request a Free Consultation',
        formLead:
          'Fill out the form below and our team will contact you within 24 hours.',
        form: contactForm.id,
        privacyPolicyUrl: '/privacy-policy',
      },
    ],
    meta: {
      title: 'Contact Us | BTC Solar Energy',
      description:
        'Contact BTC Solar Energy for a free solar consultation in Moldova. Request a quote for residential or commercial installation.',
    },
  }
}
