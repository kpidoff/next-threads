# Next-Threads

Une bibliothèque React moderne pour créer des fils de discussion (threads) élégants et interactifs, construite avec Next.js 14 et Material-UI.

## 🌟 Fonctionnalités

- Interface utilisateur moderne et responsive
- Support complet des avatars utilisateurs
- Affichage intelligent des dates (format relatif pour les messages récents)
- Support des réponses imbriquées
- Thème personnalisable via Material-UI
- Support TypeScript complet
- Optimisé pour les performances

## 📦 Installation

```bash
# Installation des dépendances
pnpm install

# Développement
pnpm dev

# Build
pnpm build
```

## 🚀 Utilisation rapide

```tsx
import { Thread } from 'next-threads';

const MyThread = () => {
  const thread = {
    author: {
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg"
    },
    content: "Contenu du message",
    createdAt: new Date(),
    replies: []
  };

  return <Thread data={thread} />;
};
```

## 🏗️ Structure du projet

```
next-threads/
├── packages/
│   └── next-threads/     # Bibliothèque principale
│       ├── src/
│       │   ├── components/   # Composants React
│       │   ├── hooks/        # Hooks personnalisés
│       │   └── types/        # Types TypeScript
│       └── package.json
└── apps/
    └── demo/             # Application de démonstration
```

## 🛠️ Développement

### Bibliothèque

```bash
# Dans le dossier packages/next-threads
pnpm dev
```

### Application de démonstration

```bash
# Dans le dossier apps/demo
pnpm dev
```

## 🎨 Personnalisation

La bibliothèque utilise Material-UI pour le style, vous pouvez donc personnaliser l'apparence en utilisant le système de thème de MUI :

```tsx
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  // Votre configuration de thème personnalisée
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Thread data={threadData} />
  </ThemeProvider>
);
```

## 🧪 Tests

```bash
# Exécuter les tests
pnpm test

# Exécuter les tests en mode watch
pnpm test:watch
```

## 📚 Technologies utilisées

- [Next.js 14](https://nextjs.org/) - Framework React
- [Material-UI](https://mui.com/) - Bibliothèque de composants UI
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [tsup](https://github.com/egoist/tsup) - Build de la bibliothèque
- [pnpm](https://pnpm.io/) - Gestionnaire de paquets

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub. 