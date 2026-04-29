export const locales = ["pt-br", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-br";

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  imageUrl: string;
};

export type CarouselLabels = {
  swipeHint: string;
  previous: string;
  next: string;
  viewProject: string;
  viewProjectExpanded: string;
  slideLabelPrefix: string;
};

export type PortfolioContent = {
  locale: Locale;
  metadata: {
    title: string;
    description: string;
  };
  header: {
    name: string;
    role: string;
  };
  languageSwitcher: {
    ariaLabel: string;
    labels: Record<Locale, string>;
  };
  footerHintPrefix: string;
  projectsSection: {
    eyebrow: string;
    title: string;
    description: string;
    projects: ProjectItem[];
    carouselLabels: CarouselLabels;
  };
  aboutSection: {
    eyebrow: string;
    title: string;
    paragraphs: [string, string];
    role: string;
  };
  skillsSection: {
    eyebrow: string;
    title: string;
    description: string;
    showMore: string;
    showLess: string;
    groupLabels: Record<"languages" | "frameworks" | "backend" | "tools", string>;
  };
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
    directContact: string;
    socialNetworks: string;
    open: string;
    copy: string;
    copied: string;
    contacts: Array<{
      key: string;
      label: string;
      value: string;
      href?: string;
    }>;
    socials: Array<{
      key: string;
      label: string;
      href: string;
    }>;
  };
};

const projectDefinitions = [
  { id: "2048", title: "2048", href: "https://github.com/vinicius-pascoal/2048_game" },
  { id: "asciiMorph", title: "ASCII Morph", href: "https://github.com/vinicius-pascoal/AsciiMorph" },
  { id: "biblioteca-magica", title: "Biblioteca Magica", href: "https://github.com/vinicius-pascoal/biblioteca-magica" },
  { id: "geradorRecibos", title: "Gerador de Recibos", href: "https://github.com/vinicius-pascoal/automacao-recibo-cestas" },
  { id: "planify", title: "Planify", href: "https://github.com/vinicius-pascoal/Kanban-To-Do-Full-Stack" },
  { id: "runebound", title: "Runebound", href: "https://github.com/vinicius-pascoal/Runebound" },
  { id: "voidcrypt", title: "Voidcrypt", href: "https://github.com/vinicius-pascoal/Voidcrypt" },
] as const;

const projectImageBase = "/projetos";

function buildProjects(subtitles: Record<(typeof projectDefinitions)[number]["id"], string>): ProjectItem[] {
  return projectDefinitions.map((project) => ({
    id: project.id,
    title: project.title,
    subtitle: subtitles[project.id],
    href: project.href,
    imageUrl: `${projectImageBase}/${project.id}.png`,
  }));
}

function buildContent(locale: Locale): PortfolioContent {
  const texts = {
    "pt-br": {
      metadata: { title: "Portfolio - Vinicius Pascoal", description: "Portfólio de Vinicius Pascoal - Desenvolvedor Full-stack" },
      header: { role: "Desenvolvedor Full-stack" },
      projects: {
        eyebrow: "Projetos em destaque",
        title: "Meus projetos web",
        description: "Aqui estão alguns dos meus projetos web, desenvolvidos com foco em usabilidade e design responsivo.",
        subtitles: {
          "2048": "Quebra-cabeça numérico clássico",
          asciiMorph: "Conversor de imagens e GIF para arte ASCII",
          "biblioteca-magica": "Conversor de PDF para EPUB",
          geradorRecibos: "Criação rápida de recibos em PDF",
          planify: "Plataforma kanban para organização pessoal e de equipes",
          runebound: "Jogo no estilo connect-four",
          voidcrypt: "Jogo de exploração de masmorras",
        },
      },
      about: {
        eyebrow: "Sobre mim",
        title: "Quem sou e o que faço",
        paragraphs: [
          "Sou um desenvolvedor apaixonado por criar experiências digitais que combinam performance, acessibilidade e design.",
          "Aqui você encontrará alguns projetos e experimentos que gosto de construir no tempo livre, sempre com foco em qualidade e cuidado com os detalhes.",
        ] as [string, string],
        role: "Desenvolvedor Full-stack",
      },
      skills: {
        eyebrow: "Tecnologias & Skills",
        title: "Minha stack e ferramentas",
        description: "Aqui estão as tecnologias e ferramentas que utilizo no dia a dia.",
        showMore: "Exibir mais",
        showLess: "Exibir menos",
        groupLabels: { languages: "Linguagens", frameworks: "Frameworks & Libs", backend: "Back-end & DB", tools: "Ferramentas" },
      },
      contact: {
        eyebrow: "Contato & Redes",
        title: "Vamos conversar?",
        description: "Curtiu o portfólio e quer trocar uma ideia, sugerir colaboração ou conversar sobre oportunidades? Me chama pelos canais abaixo.",
        directContact: "Contato direto",
        socialNetworks: "Redes sociais",
        open: "Abrir",
        copy: "Copiar",
        copied: "Copiado",
        contacts: [
          { key: "email", label: "E-mail", value: "viniciuspascoal013@gmail.com" },
          { key: "whatsapp", label: "WhatsApp", value: "+55 (79) 99175-0501", href: "https://wa.me/5579991750501" },
          { key: "phone", label: "Telefone", value: "+55 (79) 99175-0501", href: "tel:+5579991750501" },
          { key: "city", label: "Local", value: "Aracaju" },
        ],
        socials: [
          { key: "github", label: "GitHub", href: "https://github.com/vinicius-pascoal" },
          { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/vinicius-pascoal-queiroz-maynard-38854024a" },
          { key: "instagram", label: "Instagram", href: "https://www.instagram.com/vinicius_pascoal_q" },
        ],
      },
      footerHintPrefix: "role para navegar • seção",
      languageSwitcher: {
        ariaLabel: "Selecionar idioma",
        labels: { "pt-br": "PT-BR", en: "EN", es: "ES" },
      },
      carousel: {
        swipeHint: "Deslize para navegar",
        previous: "Anterior",
        next: "Próximo",
        viewProject: "Visualizar",
        viewProjectExpanded: "Visualizar projeto",
        slideLabelPrefix: "Ir para slide",
      },
    },
    en: {
      metadata: { title: "Portfolio - Vinicius Pascoal", description: "Vinicius Pascoal's portfolio - Full-stack Developer" },
      header: { role: "Full-stack Developer" },
      projects: {
        eyebrow: "Featured projects",
        title: "My web projects",
        description: "Here are some of my web projects, built with usability and responsive design in mind.",
        subtitles: {
          "2048": "Classic number puzzle",
          asciiMorph: "Image and GIF converter to ASCII art",
          "biblioteca-magica": "PDF to EPUB converter",
          geradorRecibos: "Fast PDF receipt generator",
          planify: "Kanban platform for personal and team organization",
          runebound: "Connect-four style game",
          voidcrypt: "Dungeon exploration game",
        },
      },
      about: {
        eyebrow: "About me",
        title: "Who I am and what I do",
        paragraphs: [
          "I am a developer passionate about creating digital experiences that combine performance, accessibility, and design.",
          "Here you will find some projects and experiments I like to build in my free time, always focusing on quality and attention to detail.",
        ] as [string, string],
        role: "Full-stack Developer",
      },
      skills: {
        eyebrow: "Technologies & Skills",
        title: "My stack and tools",
        description: "Here are the technologies and tools I use every day.",
        showMore: "Show more",
        showLess: "Show less",
        groupLabels: { languages: "Languages", frameworks: "Frameworks & Libraries", backend: "Back-end & DB", tools: "Tools" },
      },
      contact: {
        eyebrow: "Contact & Social",
        title: "Let's talk?",
        description: "Did you like the portfolio and want to chat, suggest a collaboration, or talk about opportunities? Reach out through the channels below.",
        directContact: "Direct contact",
        socialNetworks: "Social networks",
        open: "Open",
        copy: "Copy",
        copied: "Copied",
        contacts: [
          { key: "email", label: "Email", value: "viniciuspascoal013@gmail.com" },
          { key: "whatsapp", label: "WhatsApp", value: "+55 (79) 99175-0501", href: "https://wa.me/5579991750501" },
          { key: "phone", label: "Phone", value: "+55 (79) 99175-0501", href: "tel:+5579991750501" },
          { key: "city", label: "Location", value: "Aracaju" },
        ],
        socials: [
          { key: "github", label: "GitHub", href: "https://github.com/vinicius-pascoal" },
          { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/vinicius-pascoal-queiroz-maynard-38854024a" },
          { key: "instagram", label: "Instagram", href: "https://www.instagram.com/vinicius_pascoal_q" },
        ],
      },
      footerHintPrefix: "use arrows to navigate • section",
      languageSwitcher: {
        ariaLabel: "Select language",
        labels: { "pt-br": "PT-BR", en: "EN", es: "ES" },
      },
      carousel: {
        swipeHint: "Swipe to navigate",
        previous: "Previous",
        next: "Next",
        viewProject: "View",
        viewProjectExpanded: "View project",
        slideLabelPrefix: "Go to slide",
      },
    },
    es: {
      metadata: { title: "Portafolio - Vinicius Pascoal", description: "Portafolio de Vinicius Pascoal - Desarrollador Full-stack" },
      header: { role: "Desarrollador Full-stack" },
      projects: {
        eyebrow: "Proyectos destacados",
        title: "Mis proyectos web",
        description: "Aquí están algunos de mis proyectos web, desarrollados con foco en usabilidad y diseño responsivo.",
        subtitles: {
          "2048": "Rompecabezas numérico clásico",
          asciiMorph: "Conversor de imágenes y GIF a arte ASCII",
          "biblioteca-magica": "Conversor de PDF a EPUB",
          geradorRecibos: "Generador rápido de recibos en PDF",
          planify: "Plataforma kanban para organización personal y de equipos",
          runebound: "Juego estilo connect-four",
          voidcrypt: "Juego de exploración de mazmorras",
        },
      },
      about: {
        eyebrow: "Sobre mí",
        title: "Quién soy y qué hago",
        paragraphs: [
          "Soy un desarrollador apasionado por crear experiencias digitales que combinan rendimiento, accesibilidad y diseño.",
          "Aquí encontrarás algunos proyectos y experimentos que me gusta construir en mi tiempo libre, siempre con foco en calidad y atención a los detalles.",
        ] as [string, string],
        role: "Desarrollador Full-stack",
      },
      skills: {
        eyebrow: "Tecnologías y Skills",
        title: "Mi stack y herramientas",
        description: "Aquí están las tecnologías y herramientas que uso a diario.",
        showMore: "Mostrar más",
        showLess: "Mostrar menos",
        groupLabels: { languages: "Lenguajes", frameworks: "Frameworks y bibliotecas", backend: "Back-end y BD", tools: "Herramientas" },
      },
      contact: {
        eyebrow: "Contacto y redes",
        title: "¿Hablamos?",
        description: "¿Te gustó el portafolio y quieres charlar, proponer una colaboración o hablar sobre oportunidades? Escríbeme por los canales abajo.",
        directContact: "Contacto directo",
        socialNetworks: "Redes sociales",
        open: "Abrir",
        copy: "Copiar",
        copied: "Copiado",
        contacts: [
          { key: "email", label: "Correo", value: "viniciuspascoal013@gmail.com" },
          { key: "whatsapp", label: "WhatsApp", value: "+55 (79) 99175-0501", href: "https://wa.me/5579991750501" },
          { key: "phone", label: "Teléfono", value: "+55 (79) 99175-0501", href: "tel:+5579991750501" },
          { key: "city", label: "Ubicación", value: "Aracaju" },
        ],
        socials: [
          { key: "github", label: "GitHub", href: "https://github.com/vinicius-pascoal" },
          { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/vinicius-pascoal-queiroz-maynard-38854024a" },
          { key: "instagram", label: "Instagram", href: "https://www.instagram.com/vinicius_pascoal_q" },
        ],
      },
      footerHintPrefix: "usa las flechas para navegar • sección",
      languageSwitcher: {
        ariaLabel: "Seleccionar idioma",
        labels: { "pt-br": "PT-BR", en: "EN", es: "ES" },
      },
      carousel: {
        swipeHint: "Desliza para navegar",
        previous: "Anterior",
        next: "Siguiente",
        viewProject: "Ver",
        viewProjectExpanded: "Ver proyecto",
        slideLabelPrefix: "Ir al slide",
      },
    },
  } satisfies Record<Locale, {
    metadata: { title: string; description: string };
    header: { role: string };
    projects: { eyebrow: string; title: string; description: string; subtitles: Record<(typeof projectDefinitions)[number]["id"], string> };
    about: { eyebrow: string; title: string; paragraphs: [string, string]; role: string };
    skills: { eyebrow: string; title: string; description: string; showMore: string; showLess: string; groupLabels: Record<"languages" | "frameworks" | "backend" | "tools", string> };
    contact: {
      eyebrow: string;
      title: string;
      description: string;
      directContact: string;
      socialNetworks: string;
      open: string;
      copy: string;
      copied: string;
      contacts: Array<{ key: string; label: string; value: string; href?: string }>;
      socials: Array<{ key: string; label: string; href: string }>;
    };
    footerHintPrefix: string;
    languageSwitcher: { ariaLabel: string; labels: Record<Locale, string> };
    carousel: CarouselLabels;
  }>;

  const entry = texts[locale];

  return {
    locale,
    metadata: entry.metadata,
    header: { name: "Vinicius Pascoal", role: entry.header.role },
    languageSwitcher: entry.languageSwitcher,
    footerHintPrefix: entry.footerHintPrefix,
    projectsSection: {
      eyebrow: entry.projects.eyebrow,
      title: entry.projects.title,
      description: entry.projects.description,
      projects: buildProjects(entry.projects.subtitles),
      carouselLabels: entry.carousel,
    },
    aboutSection: {
      eyebrow: entry.about.eyebrow,
      title: entry.about.title,
      paragraphs: entry.about.paragraphs,
      role: entry.about.role,
    },
    skillsSection: {
      eyebrow: entry.skills.eyebrow,
      title: entry.skills.title,
      description: entry.skills.description,
      showMore: entry.skills.showMore,
      showLess: entry.skills.showLess,
      groupLabels: entry.skills.groupLabels,
    },
    contactSection: {
      eyebrow: entry.contact.eyebrow,
      title: entry.contact.title,
      description: entry.contact.description,
      directContact: entry.contact.directContact,
      socialNetworks: entry.contact.socialNetworks,
      open: entry.contact.open,
      copy: entry.contact.copy,
      copied: entry.contact.copied,
      contacts: entry.contact.contacts,
      socials: entry.contact.socials,
    },
  };
}

export function getLocale(input: string | undefined | null): Locale | null {
  const normalized = (input ?? defaultLocale).toLowerCase();

  if (normalized === "pt" || normalized === "pt-br") return "pt-br";
  if (normalized === "en" || normalized === "en-us") return "en";
  if (normalized === "es" || normalized === "es-es") return "es";

  return null;
}

export function getPortfolioContent(input: string | undefined | null): PortfolioContent {
  const locale = getLocale(input) ?? defaultLocale;
  return buildContent(locale);
}
