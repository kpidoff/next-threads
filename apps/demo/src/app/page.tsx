"use client";

import { Box, Chip, Container, Link, Typography } from "@mui/material";
import { Comment, ThreadList } from "@next-threads/core";

import { useState } from "react";

interface Thread {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: React.ReactElement;
  createdAt: Date;
  likes: number;
  comments: number;
  shares: number;
  commentList: Comment[];
}

const exampleThreads = [
  {
    id: "1",
    author: {
      id: "u1",
      name: "Jean Dupont",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    content: (
      <Box>
        <Typography variant="body1" gutterBottom>
          Juste partagé un nouveau projet sur lequel je travaille ! 🚀
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
          <Chip label="#coding" size="small" />
          <Chip label="#nextjs" size="small" />
          <Chip label="#typescript" size="small" />
        </Box>
        <Box mt={2} p={2} bgcolor="grey.100" borderRadius={1}>
          <Typography variant="subtitle2" gutterBottom>
            Liens utiles :
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Link href="#" color="primary">
              Documentation Next.js
            </Link>
            <Link href="#" color="primary">
              Guide TypeScript
            </Link>
          </Box>
        </Box>
      </Box>
    ),
    createdAt: new Date(2024, 1, 15, 14, 30),
    likes: 42,
    comments: 12,
    shares: 5,
    commentList: [],
  },
  {
    id: "2",
    author: {
      id: "u2",
      name: "Marie Martin",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    content: (
      <Box>
        <Typography variant="body1" gutterBottom>
          Quelqu&apos;un a des retours sur l&apos;utilisation de TypeScript avec
          Next.js 14 ?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Je cherche à optimiser mon workflow de développement.
        </Typography>
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Points spécifiques :
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Configuration TypeScript</li>
            <li>Types génériques</li>
            <li>Performance</li>
          </ul>
        </Box>
      </Box>
    ),
    createdAt: new Date(2024, 1, 15, 12, 15),
    likes: 28,
    comments: 15,
    shares: 3,
    commentList: [],
  },
  {
    id: "3",
    author: {
      id: "u3",
      name: "Pierre Durand",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    content: (
      <Box>
        <Typography variant="body1" gutterBottom>
          🎉 Félicitations à toute l&apos;équipe pour le lancement de notre
          nouvelle fonctionnalité !
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Un grand merci à tous ceux qui ont contribué.
        </Typography>
        <Box
          mt={2}
          p={2}
          bgcolor="success.light"
          color="success.contrastText"
          borderRadius={1}
        >
          <Typography variant="subtitle2">Objectifs atteints :</Typography>
          <Box display="flex" gap={1} mt={1}>
            <Chip label="Performance +30%" size="small" color="success" />
            <Chip label="UX améliorée" size="small" color="success" />
            <Chip label="Tests 100%" size="small" color="success" />
          </Box>
        </Box>
      </Box>
    ),
    createdAt: new Date(2024, 1, 14, 18, 45),
    likes: 156,
    comments: 23,
    shares: 45,
    commentList: [],
  },
];

// Simuler une base de données de commentaires
const commentsDatabase: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: {
        id: "u1",
        name: "Sophie Martin",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      content: "Super projet ! J'ai hâte de voir le résultat final.",
      createdAt: new Date(2024, 1, 15, 14, 35),
      likes: 3,
    },
    {
      id: "c2",
      author: {
        id: "u2",
        name: "Thomas Bernard",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      content:
        "Tu utilises Next.js 14 ? J'ai quelques retours intéressants à partager.",
      createdAt: new Date(2024, 1, 15, 14, 40),
      likes: 1,
    },
  ],
  "2": [
    {
      id: "c3",
      author: {
        id: "u4",
        name: "Lucas Dubois",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      content:
        "Je recommande d'utiliser les types génériques pour les props des composants, ça rend le code plus maintenable.",
      createdAt: new Date(2024, 1, 15, 12, 20),
      likes: 5,
    },
  ],
  "3": [
    {
      id: "c4",
      author: {
        id: "u3",
        name: "Emma Petit",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      content:
        "Félicitations à toute l'équipe ! C'était un projet passionnant à travailler.",
      createdAt: new Date(2024, 1, 14, 18, 50),
      likes: 12,
    },
    {
      id: "c5",
      author: {
        id: "u2",
        name: "Nicolas Moreau",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      content:
        "Le travail d'équipe a été exemplaire ! On continue sur cette lancée !",
      createdAt: new Date(2024, 1, 14, 19, 0),
      likes: 8,
    },
  ],
};

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>(exampleThreads);

  const handleThreadComment = async (id: string) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mettre à jour les commentaires du thread
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id
          ? { ...thread, commentList: commentsDatabase[id] || [] }
          : thread
      )
    );
  };

  const handleThreadReply = async (
    id: string,
    content: string
  ): Promise<Comment> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Créer un nouveau commentaire
    const newComment: Comment = {
      id: `c${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      author: {
        id: "u1",
        name: "Utilisateur Actuel",
        avatar: "https://i.pravatar.cc/150?img=10",
      },
      content,
      createdAt: new Date(),
      likes: 0,
    };

    // Mettre à jour les commentaires du thread
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id
          ? {
              ...thread,
              commentList: [...(thread.commentList || []), newComment],
              comments: (thread.comments || 0) + 1,
            }
          : thread
      )
    );

    return newComment;
  };

  const handleThreadRemoveComment = async (
    threadId: string,
    commentId: string
  ) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mettre à jour les commentaires du thread
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              commentList: thread.commentList.filter(
                (comment) => comment.id !== commentId
              ),
              comments: (thread.comments || 0) - 1,
            }
          : thread
      )
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Démonstration des Threads
      </Typography>
      <ThreadList
        threads={threads}
        onThreadLike={(id: string) => console.log("Like thread:", id)}
        onThreadComment={handleThreadComment}
        onThreadReply={handleThreadReply}
        onThreadRemoveComment={handleThreadRemoveComment}
        isAdmin={true}
        currentUser={{
          id: "u1",
          name: "Utilisateur Actuel",
          avatar: "https://i.pravatar.cc/150?img=10",
        }}
      />
    </Container>
  );
}
