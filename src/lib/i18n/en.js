export const en = {
  nav: {
    home: 'Home',
    status: 'Status',
    services: 'Services',
    panels: 'Panels',
    openPanels: 'Open panels',
    switchTo: 'Switch language',
    menu: 'Menu'
  },
  common: {
    lastUpdated: 'Updated',
    retry: 'Retry',
    loading: 'Loading…',
    active: 'Active',
    inactive: 'Inactive',
    online: 'Online',
    offline: 'Offline',
    unknown: 'Unknown',
    backHome: 'Back to home'
  },
  footer: {
    tagline:
      'Self-hosted infrastructure run on an exact-cost cost-sharing basis, with no profit margin.',
    legalTitle: 'Legal',
    legal: 'Legal notices & cost sharing',
    tos: 'Terms of service & acceptable use (AUP)',
    contactTitle: 'Technical contact',
    monitored: 'Monitored mailbox. Replies within 72 hours in principle.',
    donationsNote:
      'No donation is required: contributions only cover ≈ {watts} W ≈ {priceNode}/month of electricity per node, the VPS bastion and the domain.',
    nonDiffusible:
      '© {year} {name} — Operated individually, non-disclosure status (art. R. 123-232 French Commercial Code).',
    bestEffort: 'Best-effort obligation — no uptime commitment.'
  },




  home: {
    heroKicker: 'Personal infrastructure · shared at exact cost',
    heroTitle: '{name}',
    heroSubtitle: 'A small, transparent pool of self-hosted machines',
    heroText:
      'This portal is the public face of a peer-to-peer cost-sharing agreement: nodes are run together and everyone only reimburses their real, documented share of the expenses — electricity, the intermediary security layers and other subscriptions. No markup, no profit, no hidden fees.',
    
    ctaStatus: 'View live status',
    ctaServices: 'What we offer',

    howKicker: 'The agreement',
    howTitle: 'So, how does it work ?',
    howText: "You will pay a flat rate which is directly linked to the monthly, real expenses made to maintain the infrastructure alive; electricity, security, etc.\nThis rate can vary in accordance with variables such as the electricity price per kwh changes, the growing infrastructure consuming more electricity, or the expansion of the number of subscriptions required to offer services of acceptable quality, but will never exceed the total expenses.\n\nIn exchange, you will have access to any and all currently unused resources within the network.\nThis is subject to fair use and self-control; If unused services were to waste hardware, they would be manually stopped in order to relocate them to other members.\nIf you were to ask for a service that exceeds the infrastructure's current free pool of resources, you will be entitled to pay for any new hardware, which can be split on all members on a voluntary basis.",
    
    transparencyKicker: 'Cost sharing — franc le franc',
    transparencyTitle: 'Where your contribution goes',
    transparencyText:
      'Monthly contributions for a standard node cover a fractional part of the real running costs only.\nThe full breakdown is published in the legal notices.',
    
    cardPower: 'Electricity per node',
    cardPowerValue: '{priceNode}/month',
    cardPowerNote:
      '≈ {watts} W × 24 h × 30 d × {priceCents}/kWh. Measured draw from a wattmeter and the technical specifications of each node.',
    cardSecurity: 'Intermediary security layers',
    cardSecurityValue: '{priceSecurity}/month',
    cardSecurityNote:
      'Monthly bill of the security layers that Beryllium provides.',
    cardMiscValue: '{priceMisc}/month',
    cardMisc: 'Miscellaneous subscriptions',
    cardMiscNote: 'Monthly subscription fees, such as VPN connections or domain names. If relevant, subscription models not following a monthly billing are converted.',

    cardMember: 'Your part',
    cardMemberValue: '{priceMember}/month',
    cardMemberNote: 'This is the current per-member price, calculated with the function `Math.ceil((e + s + m) / (u + opt))` where e is electricity, s is security and m is misc. u is the current number of users ({userCount}) and opt is used to calculate both the current price (here) and the price if you join (in services).',
    
    donationsKicker: 'Donations',
    donationsTitle: 'Entirely optional, always without privilege',
    donationsText:
      'Donations are 100% voluntary and non-compulsory. They grant no service tier, no capacity, no priority — declining one never degrades your service or gets you removed.\nFunds are held strictly as an emergency hardware safety cushion (disk, PSU, unexpected failure) or reinvested in the infrastructure for everyone, except if the donator explicitly says their donation is a personal gift to the administrator.\nThey are never income, and will never be considered as such.',
    donationsCta: 'Support the hardware',
    donationsLink: 'Read the donations clause',
    
    statusKicker: 'Live',
    statusTitle: 'Infrastructure at a glance',
    statusText: 'Node telemetry is aggregated server-side and refreshed every 20 seconds.',
    statusCta: 'Open the status dashboard'
  },




  status: {
    kicker: 'Live monitoring',
    title: 'Infrastructure status',
    subtitle:
      'Public view of the machines hosting your services and in-between security nodes.',
    nodesLabel: 'Nodes',
    nodesCount: '{online}/{total} online',
    monitorsLabel: 'Monitors',
    monitorsCount: '{up}/{total} up',
    monitorsHeading: 'Monitored network points',
    updatedLabel: 'Updated',
    refresh: 'Refresh ({seconds}s)',
    refreshing: 'Refreshing…',
    loadingTitle: 'Loading live data…',
    loadingText: 'Contacting the monitoring hubs — the dashboard fills in as soon as they answer.',
    slowLoadTitle: 'Still waiting for the hubs…',
    slowLoadText:
      'Beszel can take a while to answer (password authentication). The data will appear here automatically.',
    refreshFailed: 'Refresh failed — showing the last data received.',
    nodesHeading: 'Supervised nodes',
    unavailableTitle: 'Telemetry unavailable',
    unavailableText:
      'The monitoring hubs cannot be reached right now. Check your network and try again in a moment.',
    lastReceived: 'Last data received {when}',
    costNote:
      'Cost basis and contributions are documented in the <a href="/legal" class="text-iris hover:underline">legal notices</a>.',
    cpu: 'CPU',
    memory: 'Memory',
    disk: 'Disk',
    updated: 'Updated',
    specsHeading: 'Hardware specs',
    cpuModel: 'CPU model',
    cpuCores: 'CPU cores',
    cores: ' cores',
    threads: ' threads',
    unknown: 'Unknown',
    upFor: 'UP for {duration}',
    lastIncident: 'Last incident: {date} ({duration})'
  },




  services: {
    kicker: 'Offerings',
    title: 'Services',
    subtitle:
      'What can be provided on this infrastructure. Availability is best-effort and bound by the terms of service. Price is automatically calculated based on income (number of users) and expenses (electricity, subscriptions...) and is accounting for your application.',
    exampleBadge: 'EXAMPLE — replace with your own service',
    exampleName: 'Example: managed game server',
    exampleTagline: 'A ready-to-copy template for your own services',
    exampleDescription:
      'Describe the service here: what it is, who it is for, how it works, and any limits. Duplicate this card, edit the fields, and you have a new service.',
    featuresTitle: 'Included',
    exampleFeatures: [
      'Dedicated slot on a shared node, backed up weekly',
      'Configuration and updates handled for you',
      'Access panel with live metrics',
      'Best-effort support by email'
    ],
    examplepriceCents: 'from {priceNode}/month — exact-cost share',
    examplepriceCentsNote: 'Set your own pricing model or leave it as “on request”.',
    contactCta: 'Interested? Contact {email}'
  },




  legal: {
    kicker: 'Regulatory information',
    title: 'Legal notices',
    updated: 'Last updated: {date}',
    sections: [
      {
        h: '1. Site publisher',
        p: [
          'This site is published on an <strong>individual, non-commercial</strong> basis by the operator of the infrastructure (the “Publisher”), a natural person acting outside any commercial activity.',
          'Pursuant to <strong>article R. 123-232 of the French Commercial Code</strong>, the Publisher holds <strong>non-disclosure status (<em>statut non diffusible</em>)</strong>: their home address is therefore not published on this site nor in public registries. Official requests may be addressed to the Publisher through judicial or administrative channels; their identity is known to the competent authorities.',
          'Monitored technical contact: <a href="mailto:{email}">{email}</a> — replies within 72 hours in principle.'
        ]
      },
      {
        h: '2. Hosting',
        p: [
          'Services are hosted on machines operated directly by the Publisher (bare metal located in France), complemented by a VPS “bastion” providing entry through encrypted tunnels (Pangolin / reverse proxy). Third-party VPS and domain providers are hosting and electronic-communication service providers within the meaning of the French LCEN law.'
        ]
      },
      {
        h: '3. Cost sharing — reimbursement at exact cost (<em>au franc le franc</em>)',
        p: [
          'This site is the public portal of a <strong>cost-sharing agreement</strong> between the Publisher and the people hosted. Monthly contributions for standard nodes cover <strong>strictly a fractional part of the real expenses</strong> of the infrastructure, and nothing else:',
          '<ul><li><strong>Electricity</strong> — average measured draw of about {watts} W per standard node, i.e. <strong>≈ {electricity}/month</strong> at {priceCents}/kWh ({watts} W × 24 h × 30 d × {priceCents}/kWh).</li><li><strong>VPS bastion &amp; tunnels</strong> — monthly bill of the entry VPS and tunneling services, split pro rata.</li><li><strong>Domain &amp; associated services</strong> — annual renewal fees, prorated.</li></ul>',
          '<strong>No commercial markup or profit is applied.</strong> Any rounding only absorbs minor tariff fluctuations. Structural cost increases (electricity, VPS) will be announced with reasonable advance notice and documented here. Any surplus is either deducted at the next cycle or reinvested in hardware, and never constitutes remuneration.'
        ]
      },
      {
        h: '4. Donations',
        p: [
          'Voluntary donations may be offered. They are <strong>100% optional and non-compulsory</strong>: no service, capacity, privilege or tier is attached to a donation, and choosing not to give never degrades your service or causes removal.',
          'Donations are held strictly as an <strong>emergency hardware safety cushion</strong> (disk replacement, power supply, unexpected failure) or <strong>reinvested</strong> in the infrastructure for the benefit of all participants. They never constitute income.'
        ]
      },
      {
        h: '5. Intellectual property',
        p: [
          'Site content (texts, design, code) is made available under the terms applicable to the project. Third-party software used (Beszel, Pangolin, SvelteKit, etc.) remains subject to its own licence.'
        ]
      },
      {
        h: '6. Personal data',
        p: [
          'This site has no user account, no advertising tracker and no third-party analytics cookie. Only strictly necessary technical data (security connection logs) is processed, in accordance with the French Data Protection Act (loi Informatique et Libertés) and the GDPR. Logs are kept only as long as necessary for the security of the service and are disclosed solely under a legal obligation.'
        ]
      },
      {
        h: '7. Applicable law',
        p: [
          'These notices are governed by French law. See also the <a href="/tos">terms of service and acceptable use policy</a>.'
        ]
      }
    ]
  },




  tos: {
    kicker: 'Contract of use',
    title: 'Terms of service & acceptable use (AUP)',
    updated: 'Last updated: {date}',
    sections: [
      {
        h: '1. Subject & nature of the service',
        p: [
          'The service provides friendly hosting of virtual machines or applications within a personal infrastructure operating on the <strong>exact-cost reimbursement</strong> principle (see the <a href="/legal">legal notices</a>). It is neither a commercial offer nor a professional service.'
        ]
      },
      {
        h: '2. Best-effort obligation — no SLA',
        p: [
          'The service is provided “as is” on a <strong>best-effort</strong> basis, under an <strong>obligation of means</strong>. No availability, throughput, latency or restoration time is guaranteed. In particular:',
          '<ul><li>no uptime commitment (99.9% or otherwise) is concluded;</li><li>interruptions may occur without notice: maintenance, hardware failure, power or network outage, security incident;</li><li>telemetry displayed on this portal is informational and forms no contractual commitment.</li></ul>'
        ]
      },
      {
        h: '3. Backups — user responsibility',
        p: [
          '<strong>The user alone is responsible for keeping an off-site copy of their data</strong> (regular, tested backup outside this infrastructure). Without one, permanent data loss may occur at any time, notably following hardware failure.',
          'The Publisher may delete any data deemed abusive in volume, non-compliant with these terms, or left inactive, without prior notice or compensation.'
        ]
      },
      {
        h: '4. Exclusion of liability',
        p: [
          'To the extent permitted by law, the Publisher declines all liability for:',
          '<ul><li>failure, degradation or replacement of hosted hardware;</li><li>corruption, alteration or total/partial loss of data;</li><li>service interruptions, whatever their duration or cause;</li><li>indirect damages, loss of revenue or prejudice resulting from the service.</li></ul>',
          'The Publisher’s total liability, if any, shall not exceed the priceNode actually collected under the cost-sharing agreement during the month in question.'
        ]
      },
      {
        h: '5. Acceptable use policy (AUP)',
        p: [
          'Access to the infrastructure is strictly conditioned on compliance with this policy. The following are <strong>strictly forbidden</strong>:',
          '<ul><li>any <strong>illegal use</strong> or hosting of content contrary to French law (child sexual abuse material, hate speech, counterfeiting, fraud, etc.);</li><li><strong>DDoS attacks</strong>, port scanning, intrusion, cracking or any technique targeting an unauthorised third-party system — including from within this infrastructure;</li><li>creating, distributing or storing <strong>malware</strong>, ransomwares, botnets or attack tooling;</li><li><strong>torrenting / P2P</strong> and any sharing of copyright-protected content;</li><li><strong>spam</strong> or any unsolicited mass messaging;</li><li>durably overloading shared resources (CPU, memory, bandwidth, inodes) to the detriment of other participants;</li><li>any activity liable to prosecution or endangering network security.</li></ul>'
        ]
      },
      {
        h: '6. Sanctions & LCEN compliance',
        p: [
          'Any violation of this AUP immediately entails <strong>suspension</strong> and, where applicable, <strong>termination</strong> of the service, without notice or refund — collected sums cover expenses already incurred.',
          'Pursuant to the French <strong>Law n° 2004-575 of 21 June 2004 for Confidence in the Digital Economy (LCEN), and in particular its article 6</strong>, the Publisher retains connection logs necessary for establishing offences and discloses them to competent judicial or law-enforcement authorities upon lawful request. No prior warning is owed in the case of a characterised offence.'
        ]
      },
      {
        h: '7. Changes to these terms',
        p: [
          'The Publisher may amend these terms at any time for legal, security or service-evolution reasons. The version in force is the one published on this page; continued use after modification constitutes acceptance.'
        ]
      },
      {
        h: '8. Applicable law & disputes',
        p: [
          'These terms are governed by French law. The parties undertake to seek an amicable resolution before any legal action. Failing that, French courts shall have exclusive jurisdiction, subject to the mandatory jurisdiction rules protecting consumers.'
        ]
      }
    ]
  },




  error: {
    notFound: 'Page not found',
    generic: 'Something went wrong',
    fallback: 'The requested resource is unavailable.'
  }
}



