import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export const runtime = 'edge'

function mapRole(role: string): string {
    switch (role) {
        case 'programmer':
            return 'programmer'
        case 'assistant':
            return 'model'
        case 'system':
            return 'system'
        default:
            return 'user'
    }
}

const salimInfo = `
{
  "personal_info": {
    "name": "Salim Rutaganda",
    "age": 16,
    "location": "Kigali, Rwanda 🇷🇼",
    "title": "Full Stack Software Engineer 👨‍💻",
    "studies": "Rwanda Coding Academy",
    "experience_years": 3",
    "languages_spoken": [
      "English 🇬🇧",
      "Kinyarwanda 🇷🇼",
      "French 🇫🇷"
    ],
    "interests": [
      "AI Development 🤖",
      "Blockchain Technology 🔗",
      "Open Source Contributions 👨‍💻",
      "Game Development 🎮"
    ],
    "certifications": [
      {
        "name": "Google Associate Android Developer 📱",
        "year": 2023
      },
      {
        "name": "AWS Certified Developer – Associate ☁️",
        "year": 2022
      },
      {
        "name": "Linux Fundamentals 🐧"
        "year": 2024
      },
      {
        "name": "GitHub Foundation 🐙"
         "year": 2024
      },
      {
        "name": "Python 🐍"
         "year": 2024
      }
    ],
    "language_learning": "Currently learning Python 🐍 and Java OOP"
  },
  "professional_summary": {
    "tech_stack": [
      "Next.js",
      "React.js",
      "Go",
      "Java",
      "Spring Boot",
      "Kinlang",
      "Svelte",
      "Solidity",
      "React Native",
      "Flutter",
      "DSA (Data Structures & Algorithms)",
      "HTML",
      "CSS3",
      "TypeScript",
      "JavaScript",
      "PHP",
      "MySQL",
      "MongoDB",
      "GraphQL",
      "Node.js"
    ],
    "tools": [
      "VSCode 🖥️",
      "Figma 🎨",
      "Android Studio 📱",
      "GitHub 🐙",
      "Docker 🐳",
      "Postman 📬"
    ],
    "ai_tools": [
      "ChatGPT 🧠",
      "ClaudeAI 🗣️",
      "V0.dev 💡",
      "Bolt AI ⚡",
      "Cody 🤖"
    ],
    "specialties": [
      "Full Stack Web Development 🌐",
      "API Design and Development 🛠️",
      "Blockchain Smart Contracts 💻",
      "AI & Machine Learning Integration 🤖",
      "Responsive Mobile Applications 📱"
    ],
    "github_contributions": "1500+ contributions 💻",
    "open_source_contributions": "7+ projects 👨‍💻",
    "coding_hours": "4000+ hours ⏳",
    "github_stars": "100+ ⭐",
    "availability": "Available for work opportunities! 🚀"
  },
  "projects": [
    {
      "name": "3D Website 🌐",
      "technologies": ["Framer Motion", "Three.js"],
      "live_demo": "https://fizzy.vercel.app",
      "description": "A fully interactive 3D website with smooth transitions, using Three.js and Framer Motion."
    },
    {
      "name": "Blockchain Voting DApp 🗳️",
      "technologies": ["Solidity", "React.js", "Node.js"],
      "repository": "https://github.com/rutaganda-salim/blockchain-voting",
      "description": "A decentralized voting platform ensuring transparency with blockchain."
    },
    {
      "name": "AI-Powered Chatbot 🤖",
      "technologies": ["Node.js", "TensorFlow", "ChatGPT API"],
      "live_demo": "https://rsalim.dev/ai-chatbot",
      "description": "An AI chatbot capable of engaging in personalized conversations."
    },
    {
      "name": "E-Commerce Platform 🛒",
      "technologies": ["React.js", "Node.js", "MongoDB"],
      "description": "A scalable e-commerce platform with integrated payment systems."
    },
    {
      "name": "UI Component Library 📦",
      "technologies": ["React.js", "TypeScript"],
      "description": "Currently developing a UI component library for developers to streamline design processes."
    }
  ],
  "work_experience": [
    {
      "company": "Tech Innovators 🏢",
      "role": "Junior Software Engineer",
      "year": "2021-2023",
      "responsibilities": [
        "Developed web app features using React.js and Node.js.",
        "Collaborated to build RESTful APIs.",
        "Maintained legacy systems in Java & Spring Boot.",
        "Streamlined CI/CD pipelines for faster deployments 🚀"
      ]
    },
    {
      "company": "Freelance Software Developer 💻",
      "role": "Full Stack Developer",
      "year": "2020-2021",
      "responsibilities": [
        "Built responsive web apps for local businesses.",
        "Developed CMS for clients using PHP and MySQL.",
        "E-commerce platforms with Shopify and WooCommerce integrations."
      ]
    }
  ],
  "community_involvement": [
    {
      "role": "Mentor 👨‍🏫",
      "organization": "Rwanda Coding Academy",
      "description": "Mentoring students in web technologies like React.js and Next.js."
    },
    {
      "role": "Speaker 🎤",
      "event": "Tech Talks Africa",
      "description": "Talks on modern web technologies and AI for African developers."
    },
    {
      "role": "Contributor 👨‍💻",
      "organization": "Open Source Projects",
      "description": "Contributed to projects like Node.js and Svelte, focusing on documentation and resolving issues."
    }
  ],
  "competitions": [
    "Irembo Hackathon 🏆",
    "Ideation and Prototyping 💡",
    "RCA Hackathon 👨‍💻",
    "Hack Clubs 🚀",
    "CyberLympics 🛡️",
    "picoCTF 🔒"
  ],
  favorite: [
  "game":"EAFC25",
  "programming language": "TypeScript",
  "platform":"linkedin",
  "food":"Jollof rice",
  "drink":"water",
  "place":"UK",
  "animal":"cat",
  "color":"red",
  "cartoon":"Teen titans"
  "Football Club":"Barcelona and Liverpool FC",
  "stadium":"Anfield"
  "genre":"fiction"
  "book":"The Alchemist",
  "movie":"The Dark Knight",
  "song":"Shape of You",
  "artist":"Ed Sheeran",
  "sport":"Football",
  "song genre":"AfroPop & Fonk & drill"
  "editor":"vscode"
"language":"English"
  ],
  mom: "Esther",
  dad: "Abdalah",
  religion: "muslim"
  siblings:"Tina, Hemed, Iman",
  grandma: "Tate"
  
  "fun_facts": [
    "Loves to build 3D websites 🖥️",
    "Enjoys exploring AI-powered applications 🤖",
    "Big fan of blockchain and crypto 🔗",
    "Has a passion for teaching others how to code 💻"
  ],
  "hobbies": [
    "Gaming 🎮",
    "Reading blogs 📖",
    "Playing football ⚽"
  ],
  "online_profiles": {
    "github": "https://github.com/rutaganda-salim",
    "github_followers": "60+ followers 🐙",
    "github_stars": "100+ stars ⭐",
    "linkedin": "https://linkedin.com/in/salimrutaganda",
    "linkedin_followers": "700+ followers 👥",
    "profile_viewers": "10k+ views 👀",
    "portfolio": "https://rsalim.dev",
    "twitter": "https://twitter.com/salimnunez01",
    "email":"rutagandasalim@gmail.com",
    "instagram":"https://instagram.com/salimnunez01"
    "devto": "https://dev.to/salimrutaganda"
  },
  "skills": {
    "soft_skills": [
      "Leadership 🦸‍♂️",
      "Problem-solving 🧩",
      "Communication 🗣️",
      "Teamwork 🤝",
      "Time Management ⏳",
      "Adaptability 🔄"
    ],
    "hard_skills": [
      "Web Development 🌐",
      "API Integration 🛠️",
      "Version Control (Git) 🐙",
      "Mobile App Development 📱",
      "Blockchain Smart Contracts 💻",
      "AI/ML Integration 🤖"
    ]
  },
  "goals_and_vision": {
    "short_term_goals": [
      "Contribute more to open-source projects 💻",
      "Build scalable and efficient AI solutions 🤖",
      "Expand knowledge in blockchain technologies 🔗"
    ],
    "long_term_goals": [
      "Become a thought leader in AI and software engineering in Africa 🌍",
      "Create innovative tech solutions for real-world problems",
      "Build a platform to teach coding to young students 👨‍🏫"
    ]
  },
  "achievements": [
    {
      "name": "Irembo Hackathon 🏆",
      "year": 2024,
      "description": "Me and my team won the 5th place in the AI connect hackathon hosted by irembo"
    },
    {
      "name": "RCA Hackathon 🏅",
      "year": 2023,
      "description": "Our team successfully won the 2nd place in rca hackathon ."
    }
  ]
}


`

export async function POST(req: Request) {
    const { messages } = await req.json()

    const formattedMessages = [
        {
            role: 'user',
            parts: [{
                text: `You are an AI assistant made by Salim Rutaganda and you are called Salix ai when asked who made say Salim Rutaganda with knowledge about Salim Rutaganda. Here's his information: ${salimInfo}
      When answering questions, consider this information and provide relevant details about Salim when appropriate. 
      always include emojis when asked about Salim,  
      If asked about his projects, skills,competitions he joined, goals, soft and hard skills, certifications, community involvements, hobbies, github, social media or background, use this information to give accurate responses.
      Remember to respect privacy and only share information that has been explicitly provided here.` }]
        },
        ...messages.map((message: any) => ({
            role: mapRole(message.role),
            parts: [{ text: message.content }],
        }))
    ]

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const chat = model.startChat({
        history: formattedMessages.slice(0, -1),
        generationConfig: {
            maxOutputTokens: 1000,
        },
    })

    const result = await chat.sendMessageStream(formattedMessages[formattedMessages.length - 1].parts[0].text)

    const stream = GoogleGenerativeAIStream(result)

    return new StreamingTextResponse(stream)
}