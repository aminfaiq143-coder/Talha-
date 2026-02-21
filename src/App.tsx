/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Sparkles, 
  Hash, 
  Type as TypeIcon, 
  User, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Loader2,
  Copy,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { ToolCard } from './components/ToolCard';
import { generateTitles, generateHashtags, generateDescription, generateThumbnailIdeas } from './services/geminiService';

export default function App() {
  const [titleKeyword, setTitleKeyword] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);

  const [hashtagKeyword, setHashtagKeyword] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false);

  const [descKeyword, setDescKeyword] = useState('');
  const [description, setDescription] = useState('');
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  const [thumbKeyword, setThumbKeyword] = useState('');
  const [thumbIdeas, setThumbIdeas] = useState<string[]>([]);
  const [isGeneratingThumbs, setIsGeneratingThumbs] = useState(false);

  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleGenerateTitles = async () => {
    if (!titleKeyword.trim()) return;
    setIsGeneratingTitles(true);
    try {
      const result = await generateTitles(titleKeyword);
      setTitles(result);
    } finally {
      setIsGeneratingTitles(false);
    }
  };

  const handleGenerateHashtags = async () => {
    if (!hashtagKeyword.trim()) return;
    setIsGeneratingHashtags(true);
    try {
      const result = await generateHashtags(hashtagKeyword);
      setHashtags(result);
    } finally {
      setIsGeneratingHashtags(false);
    }
  };

  const handleGenerateDesc = async () => {
    if (!descKeyword.trim()) return;
    setIsGeneratingDesc(true);
    try {
      const result = await generateDescription(descKeyword);
      setDescription(result);
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const handleGenerateThumbs = async () => {
    if (!thumbKeyword.trim()) return;
    setIsGeneratingThumbs(true);
    try {
      const result = await generateThumbnailIdeas(thumbKeyword);
      setThumbIdeas(result);
    } finally {
      setIsGeneratingThumbs(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen animate-gradient flex flex-col selection:bg-cyan-500/30">
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6"
        >
          <Sparkles className="w-3 h-3" />
          <span>Advanced AI Growth Tools</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white mb-4"
        >
          YTTools<span className="text-cyan-400">Pro</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto"
        >
          The ultimate AI-powered platform for YouTube creators to dominate the algorithm.
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl grid gap-8">
        
        {/* Title Generator */}
        <ToolCard 
          id="title-generator"
          title="Title Generator" 
          description="Generate viral, high-CTR titles for your videos"
          icon={TypeIcon}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={titleKeyword}
                onChange={(e) => setTitleKeyword(e.target.value)}
                placeholder="Enter your video topic..."
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateTitles()}
              />
              <button 
                onClick={handleGenerateTitles}
                disabled={isGeneratingTitles}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                {isGeneratingTitles ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                <span className="hidden sm:inline">Generate</span>
              </button>
            </div>

            <AnimatePresence>
              {titles.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  {titles.map((title, i) => (
                    <div 
                      key={i} 
                      className="group flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-slate-200 text-sm">{title}</span>
                      <button 
                        onClick={() => copyToClipboard(title, `title-${i}`)}
                        className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        {copiedIndex === `title-${i}` ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ToolCard>

        {/* Hashtag Generator */}
        <ToolCard 
          id="hashtag-generator"
          title="Hashtag Generator" 
          description="Find trending hashtags to boost your reach"
          icon={Hash}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={hashtagKeyword}
                onChange={(e) => setHashtagKeyword(e.target.value)}
                placeholder="Enter keyword for hashtags..."
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateHashtags()}
              />
              <button 
                onClick={handleGenerateHashtags}
                disabled={isGeneratingHashtags}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                {isGeneratingHashtags ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                <span className="hidden sm:inline">Generate</span>
              </button>
            </div>

            <AnimatePresence>
              {hashtags.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 overflow-hidden"
                >
                  {hashtags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => copyToClipboard(tag, `tag-${i}`)}
                      className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                    >
                      {tag}
                      {copiedIndex === `tag-${i}` ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-50" />}
                    </button>
                  ))}
                  <button 
                    onClick={() => copyToClipboard(hashtags.join(' '), 'all-tags')}
                    className="w-full mt-2 py-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors underline"
                  >
                    {copiedIndex === 'all-tags' ? 'Copied All!' : 'Copy All Hashtags'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ToolCard>

        {/* Description Generator */}
        <ToolCard 
          id="description-generator"
          title="Description Generator" 
          description="SEO-optimized descriptions that rank"
          icon={FileText}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={descKeyword}
                onChange={(e) => setDescKeyword(e.target.value)}
                placeholder="What is your video about?"
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateDesc()}
              />
              <button 
                onClick={handleGenerateDesc}
                disabled={isGeneratingDesc}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                {isGeneratingDesc ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                <span className="hidden sm:inline">Generate</span>
              </button>
            </div>

            <AnimatePresence>
              {description && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group overflow-hidden"
                >
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                    {description}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(description, 'desc-copy')}
                    className="absolute top-2 right-2 p-2 bg-slate-900/80 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {copiedIndex === 'desc-copy' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ToolCard>

        {/* Thumbnail Text Ideas */}
        <ToolCard 
          id="thumbnail-ideas"
          title="Thumbnail Text" 
          description="Catchy phrases to increase your click-through rate"
          icon={ImageIcon}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={thumbKeyword}
                onChange={(e) => setThumbKeyword(e.target.value)}
                placeholder="Enter video topic..."
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateThumbs()}
              />
              <button 
                onClick={handleGenerateThumbs}
                disabled={isGeneratingThumbs}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                {isGeneratingThumbs ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                <span className="hidden sm:inline">Generate</span>
              </button>
            </div>

            <AnimatePresence>
              {thumbIdeas.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-hidden"
                >
                  {thumbIdeas.map((idea, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl"
                    >
                      <span className="text-white font-display font-bold uppercase tracking-tight">{idea}</span>
                      <button 
                        onClick={() => copyToClipboard(idea, `thumb-${i}`)}
                        className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        {copiedIndex === `thumb-${i}` ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ToolCard>

        {/* Trending Section */}
        <ToolCard 
          id="trending-section"
          title="Trending Section" 
          description="Latest creator updates & algorithm news"
          icon={TrendingUp}
        >
          <div className="space-y-3">
            {[
              { title: "YouTube Algorithm Update 2026", date: "2 days ago", tag: "Algorithm" },
              { title: "AI Tools for Content Creators", date: "1 week ago", tag: "AI" },
              { title: "Shorts Growth Strategy", date: "3 days ago", tag: "Shorts" },
              { title: "New Monetization Rules", date: "Just now", tag: "Policy" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex flex-col">
                  <span className="text-slate-200 text-sm font-medium group-hover:text-cyan-400 transition-colors">{item.title}</span>
                  <span className="text-slate-500 text-xs">{item.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-400 uppercase font-bold tracking-wider">{item.tag}</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </ToolCard>

        {/* About Owner */}
        <ToolCard 
          id="about-owner"
          title="Owner Information" 
          description="The creator behind YTToolsPro"
          icon={User}
        >
          <div className="space-y-4 text-slate-300">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/20">
                TA
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Talha Amin Faiq</h4>
                <p className="text-sm text-slate-400">YouTube Growth Expert</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="tel:03218346422" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group">
                <Phone className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">03218346422</span>
              </a>
              <a href="https://wa.me/03101914143" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group">
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">03101914143</span>
              </a>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-400 italic">
              "Professional YouTube Growth Platform Built With Advanced AI Intelligence to help creators reach their full potential."
            </p>
          </div>
        </ToolCard>

      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5 bg-black/40 backdrop-blur-sm text-center">
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-4">
          <Youtube className="w-4 h-4" />
          <span className="font-display font-bold tracking-tight">YTToolsPro.com</span>
        </div>
        <p className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
          © 2026 YTToolsPro.com | Designed & Developed Using ChatGPT AI Technology
        </p>
      </footer>
    </div>
  );
}
