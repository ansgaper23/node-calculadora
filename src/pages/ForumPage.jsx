import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { MessageSquare, PlusCircle, Send, UserCircle, ThumbsUp, MessageCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ForumPage = () => {
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null); // { id, title, content, author, date, replies: [] }
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newReplyContent, setNewReplyContent] = useState('');
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const savedThreads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
    setThreads(savedThreads);
  }, []);

  const saveThreadsToStorage = (updatedThreads) => {
    localStorage.setItem('forumThreads', JSON.stringify(updatedThreads));
  };

  const handleCreateThread = () => {
    if (!user) {
      toast({ title: "Acción Requerida", description: "Debes iniciar sesión para crear un nuevo tema.", variant: "destructive" });
      return;
    }
    if (!newThreadTitle.trim() || !newThreadContent.trim()) {
      toast({ title: "Campos Incompletos", description: "Por favor, ingresa un título y contenido para el tema.", variant: "destructive" });
      return;
    }
    const newThread = { 
      id: `thread-${Date.now()}`, 
      title: newThreadTitle, 
      content: newThreadContent, 
      author: user.email, 
      authorId: user.id,
      date: new Date().toISOString(), 
      replies: [],
      likes: 0,
      likedBy: []
    };
    const updatedThreads = [newThread, ...threads];
    setThreads(updatedThreads);
    saveThreadsToStorage(updatedThreads);
    setNewThreadTitle('');
    setNewThreadContent('');
    toast({ title: "Tema Creado", description: `El tema "${newThread.title}" ha sido publicado.` });
  };

  const handleSelectThread = (thread) => {
    setCurrentThread(thread);
    setNewReplyContent('');
  };

  const handlePostReply = () => {
    if (!user) {
      toast({ title: "Acción Requerida", description: "Debes iniciar sesión para responder.", variant: "destructive" });
      return;
    }
    if (!currentThread || !newReplyContent.trim()) {
      toast({ title: "Contenido Requerido", description: "Por favor, escribe tu respuesta.", variant: "destructive" });
      return;
    }
    const newReply = { 
      id: `reply-${Date.now()}`, 
      content: newReplyContent, 
      author: user.email, 
      authorId: user.id,
      date: new Date().toISOString(),
      likes: 0,
      likedBy: []
    };
    const updatedCurrentThread = { ...currentThread, replies: [...currentThread.replies, newReply] };
    
    const updatedThreads = threads.map(t => t.id === currentThread.id ? updatedCurrentThread : t);
    setThreads(updatedThreads);
    saveThreadsToStorage(updatedThreads);
    setCurrentThread(updatedCurrentThread);
    setNewReplyContent('');
    toast({ title: "Respuesta Publicada", description: "Tu respuesta ha sido añadida al tema." });
  };
  
  const handleLike = (type, itemId) => {
    if (!user) {
      toast({ title: "Acción Requerida", description: "Debes iniciar sesión para dar 'Me gusta'.", variant: "destructive" });
      return;
    }
    
    let updatedThreads;
    if (type === 'thread') {
      updatedThreads = threads.map(t => {
        if (t.id === itemId) {
          const alreadyLiked = t.likedBy.includes(user.id);
          return {
            ...t,
            likes: alreadyLiked ? t.likes - 1 : t.likes + 1,
            likedBy: alreadyLiked ? t.likedBy.filter(id => id !== user.id) : [...t.likedBy, user.id]
          };
        }
        return t;
      });
    } else if (type === 'reply' && currentThread) {
      const updatedReplies = currentThread.replies.map(r => {
        if (r.id === itemId) {
          const alreadyLiked = r.likedBy.includes(user.id);
          return {
            ...r,
            likes: alreadyLiked ? r.likes - 1 : r.likes + 1,
            likedBy: alreadyLiked ? r.likedBy.filter(id => id !== user.id) : [...r.likedBy, user.id]
          };
        }
        return r;
      });
      const updatedCurrentThread = { ...currentThread, replies: updatedReplies };
      updatedThreads = threads.map(t => t.id === currentThread.id ? updatedCurrentThread : t);
      setCurrentThread(updatedCurrentThread);
    }

    if (updatedThreads) {
      setThreads(updatedThreads);
      saveThreadsToStorage(updatedThreads);
    }
  };

  const getInitials = (email) => {
    if (!email) return '??';
    const parts = email.split('@')[0].split('.');
    return parts.map(part => part[0]).join('').toUpperCase().slice(0,2);
  }


  return (
    <div className="main-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-5xl mx-auto shadow-xl">
          <CardHeader className="bg-gradient-electric text-primary-foreground p-6 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare size={32} />
              <CardTitle className="text-3xl">Foro de la Comunidad ElectroPro</CardTitle>
            </div>
            <CardDescription className="text-primary-foreground/90 pt-1">
              Conéctate, comparte conocimientos y resuelve dudas con otros profesionales del sector eléctrico.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columna de Temas */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Temas Recientes</h3>
              {user ? (
                <div className="space-y-2 p-3 bg-muted rounded-md">
                  <Label htmlFor="newThreadTitle">Nuevo Tema:</Label>
                  <Input id="newThreadTitle" value={newThreadTitle} onChange={(e) => setNewThreadTitle(e.target.value)} placeholder="Título del tema" />
                  <Textarea value={newThreadContent} onChange={(e) => setNewThreadContent(e.target.value)} placeholder="Escribe el contenido de tu tema aquí..." rows={3}/>
                  <Button onClick={handleCreateThread} className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white">
                    <PlusCircle size={18} className="mr-2" /> Publicar Tema
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-muted rounded-md text-center">
                  <p className="text-sm text-muted-foreground mb-2">Debes <Link to="/login" className="text-brand-yellow hover:underline">iniciar sesión</Link> o <Link to="/registro" className="text-brand-yellow hover:underline">registrarte</Link> para crear temas o responder.</p>
                </div>
              )}
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {threads.length === 0 && <p className="text-sm text-muted-foreground">No hay temas aún. ¡Sé el primero en crear uno!</p>}
                {threads.map(thread => (
                  <div key={thread.id} className={`p-3 rounded-md cursor-pointer hover:bg-accent ${currentThread?.id === thread.id ? 'bg-accent ring-2 ring-brand-yellow' : 'bg-card border'}`} onClick={() => handleSelectThread(thread)}>
                    <p className="font-medium text-foreground truncate">{thread.title}</p>
                    <p className="text-xs text-muted-foreground">Por: {thread.author.split('@')[0]} - {new Date(thread.date).toLocaleDateString()}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <ThumbsUp size={14} className="mr-1" /> {thread.likes}
                      <MessageCircle size={14} className="ml-2 mr-1" /> {thread.replies.length}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna de Contenido del Tema y Respuestas */}
            <div className="md:col-span-2 space-y-4">
              {currentThread ? (
                <div className="max-h-[calc(80vh-100px)] overflow-y-auto pr-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-brand-blue">{currentThread.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback>{getInitials(currentThread.author)}</AvatarFallback>
                        </Avatar>
                        <span>Por: {currentThread.author.split('@')[0]} - {new Date(currentThread.date).toLocaleDateString()} {new Date(currentThread.date).toLocaleTimeString()}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{currentThread.content}</p>
                       <div className="mt-4 flex items-center">
                        <Button variant="ghost" size="sm" onClick={() => handleLike('thread', currentThread.id)} className={`mr-2 ${currentThread.likedBy.includes(user?.id) ? 'text-brand-yellow' : ''}`}>
                          <ThumbsUp size={16} className="mr-1" /> Me gusta ({currentThread.likes})
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">Respuestas ({currentThread.replies.length})</h4>
                  {currentThread.replies.map(reply => (
                    <Card key={reply.id} className="mb-3 bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarFallback>{getInitials(reply.author)}</AvatarFallback>
                          </Avatar>
                          <span>{reply.author.split('@')[0]} - {new Date(reply.date).toLocaleDateString()} {new Date(reply.date).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
                        <div className="mt-2 flex items-center">
                          <Button variant="ghost" size="xs" onClick={() => handleLike('reply', reply.id)} className={`mr-2 ${reply.likedBy.includes(user?.id) ? 'text-brand-yellow' : ''}`}>
                            <ThumbsUp size={14} className="mr-1" /> Me gusta ({reply.likes})
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {user ? (
                    <div className="mt-6 pt-4 border-t">
                      <Label htmlFor="newReplyContent" className="text-md font-semibold">Escribe una respuesta:</Label>
                      <Textarea id="newReplyContent" value={newReplyContent} onChange={(e) => setNewReplyContent(e.target.value)} placeholder="Tu respuesta..." rows={4} className="mt-2"/>
                      <Button onClick={handlePostReply} className="mt-3 bg-brand-yellow hover:bg-yellow-500 text-brand-darkBlue">
                        <Send size={18} className="mr-2" /> Publicar Respuesta
                      </Button>
                    </div>
                  ) : (
                     <p className="mt-6 pt-4 border-t text-sm text-muted-foreground">Debes <Link to="/login" className="text-brand-yellow hover:underline">iniciar sesión</Link> para responder.</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-muted rounded-lg">
                  <MessageSquare size={48} className="text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground">Selecciona un tema para leer</p>
                  <p className="text-sm text-muted-foreground">Elige un tema de la izquierda para ver su contenido y participar en la conversación.</p>
                </div>
              )}
            </div>
          </CardContent>
           <CardFooter className="p-6 text-xs text-muted-foreground">
            <p>El contenido del foro se guarda localmente en tu navegador. Para una experiencia de foro persistente y accesible desde cualquier dispositivo, se implementará Supabase próximamente.</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForumPage;