export const fr = {
  nav: {
    home: 'Accueil',
    status: 'Statut',
    services: 'Services',
    panels: 'Panneaux',
    openPanels: 'Ouvrir les panneaux',
    switchTo: 'Changer de langue',
    menu: 'Menu'
  },
  common: {
    lastUpdated: 'Mis à jour',
    retry: 'Réessayer',
    loading: 'Chargement…',
    active: 'Actif',
    inactive: 'Inactif',
    online: 'En ligne',
    offline: 'Hors ligne',
    unknown: 'Inconnu',
    backHome: "Retour à l'accueil"
  },
  footer: {
    tagline:
      "Infrastructure auto-hébergée fonctionnant selon un principe de remboursement de frais au franc le franc, sans marge commerciale.",
    legalTitle: 'Informations légales',
    legal: 'Mentions légales & partage des frais',
    tos: "Conditions d'utilisation & usage acceptable (AUP)",
    contactTitle: 'Contact technique',
    monitored: 'Courriel supervisé. Réponse sous 72 heures en principe.',
    donationsNote:
      "Aucun don n'est requis : les contributions servent uniquement à couvrir {watts} W ≈ {priceNode}/mois d'électricité par nœud, le bastion VPS et le domaine.",
    nonDiffusible:
      '© {year} {name} — Édité à titre individuel, statut non diffusible (art. R. 123-232 C. com.).',
    bestEffort: 'Obligation de moyens — aucun engagement de disponibilité.'
  },




  home: {
    heroKicker: 'Infrastructure personnelle · partagée au prix coûtant',
    heroTitle: '{name}',
    heroSubtitle: 'Un petit pool transparent de machines auto-hébergées',
    heroText:
      "Ce portail est la vitrine publique d'une convention de partage de frais entre pairs : les nœuds sont exploités ensemble et chacun ne rembourse que sa quote-part réelle et documentée des dépenses — électricité, sécurité hors-site et nom(s) de domaine. Sans marge, sans profit, sans frais cachés.",
    
    ctaStatus: 'Voir le statut en direct',
    ctaServices: 'Nos services',
    
    howKicker: "L'accord",
    howTitle: 'Et donc, comment ça marche ?',
    howText: "Vous paierez un forfait mensuel directement lié aux dépenses réelles de maintenance de l'infrastructure (électricité, sécurité, etc).\nCe forfait peut varier en fonction de différents facteurs, tels que le prix de l'électricité par kWh, la consommation électrique croissante de l'infrastructure ou l'augmentation du nombre d'abonnements nécessaires pour maintenir un niveau de service acceptable, mais ne dépassera jamais le total des dépenses.\n\nEn contrepartie, vous aurez accès à toutes les ressources non utilisées du réseau, sous réserve d'une utilisation raisonnable et d'une autodiscipline.\nSi des services inutilisés entraînent un gaspillage de ressources matérielles, ils seront arrêtés manuellement afin de les réattribuer à d'autres membres.\nSi vous demandez un service dépassant les ressources disponibles de l'infrastructure, vous devrez prendre en charge le coût du nouveau matériel, qui pourra être partagé entre les membres sur une base volontaire.",

    transparencyKicker: 'Partage des frais — au franc le franc',
    transparencyTitle: 'Où vont vos contributions',
    transparencyText:
      "Les contributions mensuelles d'un nœud standard couvrent uniquement une quote-part des dépenses réelles. Le détail complet est publié dans les mentions légales.",
    
    cardPower: 'Électricité par nœud',
    cardPowerValue: '{priceNode}/mois',
    cardPowerNote:
      "≈ {watts} W × 24 h × 30 j × {priceCents}/kWh. Consommation réelle, sans marge. Donnée récoltée à partir d'un wattmètre utilisé pour des mesures journalières et de la documentation technique des noeuds utilisés.",
    cardSecurity: 'Couches de sécurité hors-site',
    cardSecurityValue: '{priceSecurity}/mois',
    cardSecurityNote:
      "Facture mensuelle des différentes couches de sécurité que propose Beryllium.",
    cardMisc: 'Domaine & renouvellements',
    cardMiscValue: '{priceMisc}/mois',
    cardMiscNote: 'Frais mensuels de renouvellement, calculés à partir des frais annuels le cas échéant.',

    cardMember: 'Votre part',
    cardMemberValue: '{priceMember}/mois',
    cardMemberNote: "Il s'agit du prix actuel par membre, calculé avec la fonction `Math.ceil((e + s + m) / (u + opt))` où e représente l'électricité, s la sécurité et m divers. u représente le nombre actuel d'utilisateurs ({userCount}) et opt ​​est utilisé pour calculer à la fois le prix actuel (ici) et le prix si vous vous inscrivez (dans les services).",
    
    donationsKicker: 'Dons',
    donationsTitle: 'Totalement optionnels, toujours sans privilège',
    donationsText:
      "Les dons sont volontaires à 100 % et non compulsifs. Ils n'apportent aucun service, aucune capacité, aucune priorité — ne pas en donner ne dégrade jamais votre service ni n'entraîne votre exclusion.\nLes fonds sont exclusivement réservés à une coussin de sécurité matérielle d'urgence (disque, alimentation, panne imprévue) ou réinvestis dans l'infrastructure au profit de tous, excepté si le donateur exprime explicitement une volonté d'un don personnel à l'intention de l'administrateur.\nIls ne constituent jamais un revenu et ne seront jamais considérés comme tels.",
    donationsCta: 'Soutenir le matériel',
    donationsLink: 'Lire la clause de dons',
    
    statusKicker: 'En direct',
    statusTitle: "L'infrastructure en bref",
    statusText:
      'La télémétrie des nœuds est agrégée côté serveur et actualisée toutes les 20 secondes.',
    statusCta: 'Ouvrir le tableau de bord'
  },




  status: {
    kicker: 'Supervision en direct',
    title: "Statut de l'infrastructure",
    subtitle:
      "Vue publique des machines hébergeant vos services, et des noeuds de sécurité intermédiaires.",
    nodesLabel: 'Noeuds',
    nodesCount: '{online}/{total} en ligne',
    monitorsLabel: 'Moniteurs',
    monitorsCount: '{up}/{total} actifs',
    monitorsHeading: 'Points réseau surveillés',
    updatedLabel: 'Actualisé',
    refresh: 'Actualiser ({seconds}s)',
    refreshing: 'Actualisation…',
    loadingTitle: 'Chargement des données en direct…',
    loadingText: "Contact des superviseurs — le tableau de bord se remplit dès qu'ils répondent.",
    slowLoadTitle: 'Toujours en attente des superviseurs…',
    slowLoadText:
      'Beszel peut mettre du temps à répondre (authentification). Les données apparaîtront ici automatiquement.',
    refreshFailed: 'Actualisation échouée — affichage des dernières données reçues.',
    nodesHeading: 'Noeuds supervisés',
    unavailableTitle: 'Télémétrie indisponible',
    unavailableText:
      "Impossible de joindre les superviseurs pour l'instant. Vérifiez le réseau et réessayez dans un instant.",
    lastReceived: 'Dernière donnée reçue {when}',
    costNote:
      'Base de coût et contributions sont documentées dans les <a href="/legal" class="text-iris hover:underline">mentions légales</a>.',
    cpu: 'CPU',
    memory: 'Mémoire',
    disk: 'Disque',
    updated: 'Mise à jour',
    specsHeading: 'Spécifications matérielles',
    cpuModel: 'Modèle CPU',
    cpuCores: 'Cœurs CPU',
    cores: ' cœurs',
    threads: ' threads',
    unknown: 'Inconnu',
    upFor: 'Actif depuis {duration}',
    lastIncident: 'Dernier incident : {date} ({duration})'
  },




  services: {
    kicker: 'Prestations',
    title: 'Services',
    subtitle:
      'Ce qui peut être proposé sur cette infrastructure. La disponibilité est best effort et soumise aux conditions de service. Le prix est automatiquement calculé en fonction des revenus (nombre de membres) et des dépenses (électricité, abonnements...) et prend en compte votre candidature.',
    exampleBadge: 'EXEMPLE — remplacez par votre propre service',
    exampleName: 'Exemple : serveur de jeu administré',
    exampleTagline: 'Un modèle prêt à copier pour vos propres services',
    exampleDescription:
      "Décrivez ici le service : ce qu'il est, à qui il s'adresse, comment il fonctionne et ses limites. Dupliquez cette carte, modifiez les champs, et vous avez un nouveau service.",
    featuresTitle: 'Inclus',
    exampleFeatures: [
      'Créneau dédié sur un nœud partagé, sauvégardé chaque semaine',
      'Configuration et mises à jour prises en charge',
      "Panneau d'accès avec métriques en direct",
      'Support best effort par courriel'
    ],
    examplepriceCents: "dès {priceNode}/mois — part au prix coûtant",
    examplepriceCentsNote: 'Choisissez votre propre modèle tarifaire ou laissez « sur demande ».',
    contactCta: 'Intéressé ? Contactez {email}'
  },




  legal: {
    kicker: 'Informations réglementaires',
    title: 'Mentions légales',
    updated: 'Dernière mise à jour : {date}',
    sections: [
      {
        h: '1. Éditeur du site',
        p: [
          "Le présent site est édité à titre <strong>individuel et non commercial</strong> par l'opérateur de l'infrastructure (ci-après « l'Éditeur »), personne physique agissant en dehors de toute activité commerciale.",
          "Conformément à l'<strong>article R. 123-232 du Code de commerce</strong>, l'Éditeur bénéficie du <strong>statut non diffusible</strong> : son adresse personnelle n'est donc pas publiée sur ce site ni dans les registres publics. Toute demande officielle peut être adressée à l'Éditeur, dont l'identité est connue des autorités compétentes.",
          'Contact technique supervisé : <a href="mailto:{email}">{email}</a> — réponse sous 72 heures en principe.'
        ]
      },
      {
        h: '2. Hébergement',
        p: [
          "Les services sont hébergés sur des machines exploitées directement par l'Éditeur (bare metal, situées en France), complétées par un VPS « bastion » assurant l'entrée par tunnels chiffrés (Pangolin / reverse proxy). Les fournisseurs tiers du VPS et du nom de domaine sont des prestataires d'hébergement et de communication électronique au sens de la LCEN."
        ]
      },
      {
        h: '3. Partage des frais — remboursement au franc le franc',
        p: [
          "Ce site est le portail public d'une <strong>convention de partage de frais</strong> entre l'Éditeur et les personnes hébergées. Les contributions mensuelles des nœuds standard couvrent <strong>strictement une quote-part des dépenses réelles</strong> de l'infrastructure, et rien d'autre :",
          "<ul><li><strong>Électricité</strong> — consommation moyenne constatée d'environ {watts} W par nœud standard, soit <strong>≈ {electricity}/mois</strong> au tarif de {priceCents}/kWh ({watts} W × 24 h × 30 j × {priceCents}/kWh).</li><li><strong>VPS bastion &amp; tunnels</strong> — facture mensuelle du serveur virtuel d'entrée et des services de tunneling, répartie au prorata.</li><li><strong>Nom de domaine &amp; services associés</strong> — frais annuels de renouvellement, proratisés.</li></ul>",
          "<strong>Aucune marge commerciale ni profit n'est appliqué.</strong> Les éventuels arrondis servent uniquement à absorber les micro-fluctuations tarifaires. En cas de hausse structurelle des coûts réels (électricité, VPS), la révision des contributions est annoncée avec un préavis raisonnable et documentée ici. Tout excédent est soit déduit au cycle suivant, soit réinvesti dans le matériel, et ne constitue jamais une rémunération."
        ]
      },
      {
        h: '4. Dons',
        p: [
          "Des dons volontaires peuvent être proposés. Ils sont <strong>100 % optionnels et non compulsifs</strong> : aucun service, aucune capacité, aucun privilège ni palier n'est attaché à un don, et le fait de ne pas donner ne dégrade jamais votre service ni n'entraîne votre exclusion.",
          "Les dons sont exclusivement réservés à une <strong>coussin de sécurité matérielle d'urgence</strong> (remplacement de disque, alimentation, panne imprévue) ou <strong>réinvestis</strong> dans l'infrastructure au profit de tous les participants. Ils ne constituent en aucun cas un revenu."
        ]
      },
      {
        h: '5. Propriété intellectuelle',
        p: [
          "Le contenu de ce site (textes, charte, code) est mis à disposition selon les termes applicables au projet. Les logiciels tiers utilisés (Beszel, Pangolin, SvelteKit, etc.) restent soumis à leurs propres licences."
        ]
      },
      {
        h: '6. Données personnelles',
        p: [
          "Ce site ne comporte aucun compte utilisateur, aucun tracker publicitaire et aucun cookie de mesure d'audience tierce. Seules des données techniques strictement nécessaires au fonctionnement (journaux de connexion sécurisés) sont traitées, conformément à la loi n° 78-17 dite « Informatique et Libertés » et au RGPD. Les journaux sont conservés pour la durée nécessaire à la sécurité du service et ne sont communiqués qu'en cas d'obligation légale."
        ]
      },
      {
        h: '7. Droit applicable',
        p: [
          "Les présentes mentions sont régies par le droit français. Voir également les <a href=\"/tos\">conditions générales d'utilisation et la politique d'usage acceptable</a>."
        ]
      }
    ]
  },




  tos: {
    kicker: "Contrat d'utilisation",
    title: "Conditions générales d'utilisation (CGU) & usage acceptable",
    updated: 'Dernière mise à jour : {date}',
    sections: [
      {
        h: '1. Objet & nature du service',
        p: [
          "Le service propose un hébergement amical de machines virtuelles ou de services, au sein d'une infrastructure personnelle fonctionnant selon le principe du <strong>remboursement de frais au franc le franc</strong> (voir les <a href=\"/legal\">mentions légales</a>). Il ne s'agit ni d'une offre commerciale, ni d'un service professionnel."
        ]
      },
      {
        h: '2. Obligation de moyens — aucun SLA',
        p: [
          "Le service est fourni « en l'état » et sous forme <strong>best effort</strong>, dans le cadre d'une <strong>obligation de moyens</strong>. Aucune disponibilité, aucun débit, aucune latence et aucun délai de rétablissement ne sont garantis. En particulier :",
          '<ul><li>aucun engagement de taux de disponibilité (99,9 % ou autre) n\'est conclu ;</li><li>des interruptions peuvent survenir sans préavis : maintenance, panne matérielle, coupure réseau ou électricité, incident de sécurité ;</li><li>les télémétries affichées sur ce portail sont fournies à titre informatif et ne constituent pas un engagement contractuel.</li></ul>'
        ]
      },
      {
        h: '3. Sauvegardes — responsabilité de l’utilisateur',
        p: [
          "<strong>L'utilisateur reste seul responsable de la conservation d'une copie de ses données hors de l'infrastructure</strong> (backup off-site régulier et testé). À défaut, une perte définitive peut intervenir à tout moment, notamment en cas de défaillance matérielle.",
          "L'Éditeur peut supprimer toute donnée jugée abusive en volume, non conforme aux présentes CGU, ou laissée sans activité, sans préavis ni indemnité."
        ]
      },
      {
        h: '4. Exclusion de responsabilité',
        p: [
          "Dans les limites autorisées par la loi, l'Éditeur décline toute responsabilité pour :",
          '<ul><li>la panne, la dégradation ou le remplacement du matériel hébergé ;</li><li>la corruption, l\'altération ou la perte totale ou partielle des données ;</li><li>les interruptions de service, quels qu\'en soient la durée ou la cause ;</li><li>les dommages indirects, pertes de chiffre d\'affaires ou préjudices subis du fait du service.</li></ul>',
          "La responsabilité totale de l'Éditeur, le cas échéant, ne saurait excéder le montant effectivement perçu au titre du partage de frais durant le mois civil considéré."
        ]
      },
      {
        h: "5. Politique d'usage acceptable (AUP)",
        p: [
          "L'accès à l'infrastructure est strictement conditionné au respect de la politique d'usage acceptable. Sont notamment <strong>interdits</strong> :",
          '<ul><li>tout <strong>usage illicite</strong> ou hébergement de contenus contraires à la loi française (contenus pédopornographiques, incitation à la haine, contrefaçon, escroquerie, etc.) ;</li><li>les <strong>attaques de type DDoS</strong>, le scan de ports, l\'intrusion, le crackage ou toute technique visant un système tiers non autorisé — y compris depuis l\'intérieur de l\'infrastructure ;</li><li>la création, la diffusion ou le stockage de <strong>malwares</strong>, ransomwares, botnets ou outils d\'attaque ;</li><li>le <strong>torrent / P2P</strong> et tout partage de contenus protégés par le droit d\'auteur ;</li><li>le <strong>spam</strong> de messagerie ou tout envoi massif non sollicité ;</li><li>la surcharge durable des ressources partagées (CPU, mémoire, bande passante, inodes) au détriment des autres participants ;</li><li>toute activité passible de poursuites ou portant atteinte à la sécurité du réseau.</li></ul>'
        ]
      },
      {
        h: '6. Sanctions & conformité LCEN',
        p: [
          "Toute violation de la AUP entraîne de plein droit la <strong>suspension immédiate</strong> puis, le cas échéant, la <strong>résiliation définitive</strong> du service, sans préavis ni remboursement — les sommes perçues couvrant des frais déjà engagés.",
          "Conformément à la <strong>loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), et notamment son article 6</strong>, l'Éditeur conserve les journaux de connexion nécessaires à la constatation d'infractions et les communique aux autorités judiciaires ou de police compétentes sur réquisition régulière. Aucun avertissement préalable n'est dû en cas d'infraction caractérisée."
        ]
      },
      {
        h: '7. Modification des CGU',
        p: [
          "L'Éditeur peut modifier les présentes CGU à tout moment pour des raisons légales, de sécurité ou d'évolution du service. La version en vigueur est celle publiée sur cette page ; toute continuation d'usage après modification vaut acceptation."
        ]
      },
      {
        h: '8. Droit applicable & litiges',
        p: [
          "Les présentes CGU sont régies par le droit français. En cas de litige, les parties s'engagent à rechercher une résolution amiable avant toute action judiciaire. À défaut, les tribunaux français seront seuls compétents, dans le respect des règles de compétence impératives applicables aux consommateurs."
        ]
      }
    ]
  },




  error: {
    notFound: 'Page introuvable',
    generic: 'Une erreur est survenue',
    fallback: 'La ressource demandée est indisponible.'
  }
}


