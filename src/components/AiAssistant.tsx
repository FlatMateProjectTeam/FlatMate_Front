import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import OpenAI from 'openai';
import { mockHousingMatches, mockRoommateMatches, HousingMatch, RoommateMatch } from '@/data/mockMatches';
import { HousingMatchCard } from './HousingMatchCard';
import { RoommateMatchCard } from './RoommateMatchCard';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  matches?: {
    type: 'housing' | 'roommate';
    data: HousingMatch[] | RoommateMatch[];
  };
}

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you find the perfect roommate or housing today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { toast } = useToast();

  // Initialize OpenAI - Using environment variable for security
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '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',
    dangerouslyAllowBrowser: true // Required for frontend use - NOT RECOMMENDED for production
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Prepare context data for AI
      const contextData = {
        housing: mockHousingMatches,
        roommates: mockRoommateMatches
      };

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: `You are a helpful assistant for a roommate and housing matching platform. 
            
Available housing: ${JSON.stringify(mockHousingMatches.map(h => ({
  title: h.title,
  price: h.price,
  city: h.city,
  bedrooms: h.bedrooms,
  bathrooms: h.bathrooms
})))}

Available roommates: ${JSON.stringify(mockRoommateMatches.map(r => ({
  name: r.firstName,
  age: r.age,
  job: r.job,
  city: r.city,
  budget: `${r.budgetMin}-${r.budgetMax}`,
  bio: r.bio
})))}

When users ask about roommates or housing, provide helpful suggestions based on their needs.
At the end of your response, add EXACTLY one of these markers:
- [SHOW_HOUSING] if they're looking for apartments/housing
- [SHOW_ROOMMATES] if they're looking for roommates
- [SHOW_BOTH] if they want both
- [SHOW_NONE] if it's just a general question

Be conversational, friendly, and helpful. Keep responses concise but informative.`
          },
          { role: "user", content: input }
        ],
      });

      const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not process that request.';
      
      // Parse the response to determine if we should show matches
      let matchType: 'housing' | 'roommate' | 'both' | 'none' = 'none';
      let cleanResponse = aiResponse;
      
      if (aiResponse.includes('[SHOW_HOUSING]')) {
        matchType = 'housing';
        cleanResponse = aiResponse.replace('[SHOW_HOUSING]', '').trim();
      } else if (aiResponse.includes('[SHOW_ROOMMATES]')) {
        matchType = 'roommate';
        cleanResponse = aiResponse.replace('[SHOW_ROOMMATES]', '').trim();
      } else if (aiResponse.includes('[SHOW_BOTH]')) {
        matchType = 'both';
        cleanResponse = aiResponse.replace('[SHOW_BOTH]', '').trim();
      } else {
        cleanResponse = aiResponse.replace('[SHOW_NONE]', '').trim();
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanResponse,
        timestamp: new Date(),
        matches: matchType === 'housing' ? {
          type: 'housing',
          data: mockHousingMatches.slice(0, 3) // Show top 3 matches
        } : matchType === 'roommate' ? {
          type: 'roommate',
          data: mockRoommateMatches.slice(0, 3) // Show top 3 matches
        } : undefined
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key.",
        variant: "destructive"
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300',
          'bg-primary hover:bg-primary/90 text-primary-foreground',
          'hover:scale-110 hover:shadow-xl',
          isOpen && 'scale-0 opacity-0'
        )}
        size="icon"
      >
        <Sparkles className="h-6 w-6" />
      </Button>

      {/* Chat Popup */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 flex flex-col bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300',
          'w-[380px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]',
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none',
          'origin-bottom-right'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">AI Assistant</h3>
              <p className="text-xs text-primary-foreground/80">Always here to help</p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-3">
              <div
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <span className="text-[10px] opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {/* Display match cards if available */}
              {message.matches && message.role === 'assistant' && (
                <div className="pl-2 space-y-2">
                  {message.matches.type === 'housing' && (
                    <div className="grid grid-cols-1 gap-2">
                      {(message.matches.data as HousingMatch[]).map((housing) => (
                        <HousingMatchCard key={housing.id} housing={housing} />
                      ))}
                    </div>
                  )}
                  {message.matches.type === 'roommate' && (
                    <div className="grid grid-cols-1 gap-2">
                      {(message.matches.data as RoommateMatch[]).map((roommate) => (
                        <RoommateMatchCard key={roommate.id} roommate={roommate} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background rounded-b-2xl">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="min-h-[44px] max-h-[120px] resize-none rounded-xl"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              size="icon"
              className="h-[44px] w-[44px] rounded-xl shrink-0 bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            ⚠️ Try: "Show me apartments in Casablanca" or "Find me a roommate"
          </p>
        </div>
      </div>
    </>
  );
};
