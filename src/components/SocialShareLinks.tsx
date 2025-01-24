import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube 
} from 'lucide-react';

interface SocialShareProps {
  title?: string;
  url?: string;
}

const SocialShareLinks: React.FC<SocialShareProps> = ({ 
  title = 'Check out this post', 
  url = typeof window !== 'undefined' ? window.location.href : '' 
}) => {
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: <Facebook fill="#4267B2" color="#4267B2" />,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter fill="#1DA1F2" color="#1DA1F2" />,
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    },
    {
      name: 'YouTube',
      icon: <Youtube fill="#FE0003" color="#FE0003" />,
      shareUrl: `https://www.youtube.com/share?title=${encodeURIComponent(title)}`
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin fill="#0173B2" color="#0173B2" />,
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="text-center">
      <span className="text-gray-900 text-xl uppercase font-bold block mb-8">
        Share
      </span>
      <ul className="space-y-4 flex-col">
        {socialPlatforms.map((platform) => (
          <li key={platform.name}>
            <button 
              onClick={() => handleShare(platform.shareUrl)}
              className="w-full h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              aria-label={`Share on ${platform.name}`}
            >
              {platform.icon}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialShareLinks;