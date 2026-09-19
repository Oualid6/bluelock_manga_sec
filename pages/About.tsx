import React from 'react';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
    const { lang } = useLanguage();
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen">
            <SEOHead
                title={isFr ? "À Propos - Blue Lock Manga" : (isEs ? "Sobre Nosotros - Blue Lock Manga" : "About Us - Blue Lock Manga")}
                description={isFr ? "Découvrez notre plateforme dédiée aux passionnés du manga Blue Lock, nos engagements de lecture et notre communauté." : (isEs ? "Descubre nuestra plataforma dedicada a los fans del manga Blue Lock, nuestro compromiso de lectura y nuestra comunidad." : "Learn about our dedicated reader platform built for fans to follow Blue Lock manga chapters and story updates.")}
                canonicalUrl={`https://bluelocken.com/${lang}/about`}
            />

            <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">
                {isFr ? "À Propos de Nous" : (isEs ? "Sobre Nosotros" : "About Our Platform")}
            </h1>

            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6">
                <p className="lead text-xl text-gray-600 dark:text-gray-400">
                    {isFr ? (
                        <>Bienvenue sur <strong>Blue Lock Manga Hub</strong>, un espace conçu par et pour les passionnés de l'œuvre palpitante de Muneyuki Kaneshiro et Yusuke Nomura.</>
                    ) : isEs ? (
                        <>Bienvenido a <strong>Blue Lock Manga Hub</strong>, un espacio diseñado por y para apasionados de la inolvidable obra de Muneyuki Kaneshiro y Yusuke Nomura.</>
                    ) : (
                        <>Welcome to <strong>Blue Lock Manga Hub</strong>, a reader platform crafted specifically for enthusiasts of Muneyuki Kaneshiro and Yusuke Nomura's iconic sports series.</>
                    )}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    {isFr ? "Notre Engagement auprès des Lecteurs" : (isEs ? "Nuestro Compromiso con los Lectores" : "Our Commitment to Readers")}
                </h2>
                <p>
                    {isFr ? (
                        "Notre objectif est de proposer une expérience de lecture fluide, moderne et épurée. Nous nous efforçons de préserver la qualité visuelle de chaque planche pour restituer toute l'intensité des matchs et des illustrations originales."
                    ) : isEs ? (
                        "Nuestro objetivo es ofrecer una experiencia de lectura fluida, moderna y sin distracciones. Nos aseguramos de mantener la máxima claridad visual en cada página para transmitir toda la intensidad de los partidos y del dibujo original."
                    ) : (
                        "Our goal is to deliver a smooth, responsive, and distraction-free reading experience. We ensure every panel retains crisp clarity so you can appreciate the intricate art and high-octane drama of every match."
                    )}
                </p>
                <p>
                    {isFr ? (
                        "Que vous relisiez les premiers pas de Yoichi Isagi au centre d'entraînement ou que vous suiviez les révélations de la Neo Egoist League, notre site vous permet de parcourir la série en toute simplicité."
                    ) : isEs ? (
                        "Ya sea que estés repasando los primeros pasos de Yoichi Isagi en el centro de entrenamiento o siguiendo el desarrollo de la Neo Egoist League, nuestro sitio te permite disfrutar de la serie fácilmente."
                    ) : (
                        "Whether you are revisiting Yoichi Isagi's initial trials in the selection arc or staying up to date with the Neo Egoist League, our platform keeps your reading flow fast and effortless."
                    )}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    {isFr ? "Ce qui nous Distingue" : (isEs ? "Lo que nos Diferencia" : "What Sets Us Apart")}
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    {isFr ? (
                        <>
                            <li><strong>Confort visuel optimal :</strong> Scans nets et lecteur adaptatif sur mobile, tablette et ordinateur.</li>
                            <li><strong>Suivi régulier :</strong> Accès direct aux nouveaux chapitres dès leur parution.</li>
                            <li><strong>Interface épurée :</strong> Navigation intuitive centrée sur le contenu sans éléments superflus.</li>
                            <li><strong>Communauté passionnée :</strong> Partage d'analyses et de théories avec d'autres fans d'egoists.</li>
                        </>
                    ) : isEs ? (
                        <>
                            <li><strong>Lectura Visual Óptima:</strong> Páginas nítidas y lector adaptado para móviles, tablets y ordenadores.</li>
                            <li><strong>Actualizaciones Rápidas:</strong> Acceso a los nuevos capítulos conforme están disponibles.</li>
                            <li><strong>Diseño Limpio:</strong> Una interfaz enfocada en el contenido sin distracción alguna.</li>
                            <li><strong>Comunidad de Fans:</strong> Un espacio para conectar con otros lectores apasionados por el proyecto Blue Lock.</li>
                        </>
                    ) : (
                        <>
                            <li><strong>Optimized Reader Experience:</strong> Crisp image rendering tailored for desktop and mobile screens.</li>
                            <li><strong>Prompt Chapter Releases:</strong> Quick access to new Blue Lock manga chapters as they become available.</li>
                            <li><strong>Clean Interface:</strong> A reader-first design free from clutter and frustrating redirects.</li>
                            <li><strong>Fan Community:</strong> A place to connect with fellow readers following the journey of Japan's top strikers.</li>
                        </>
                    )}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    {isFr ? "Nous Contacter" : (isEs ? "Contacto y Sugerencias" : "Contact & Feedback")}
                </h2>
                <p>
                    {isFr ? (
                        <>Une question, un retour ou une suggestion ? Notre équipe reste à votre écoute :<br />Email : <a href="mailto:Support@bluelocken.com" className="text-bb-blue hover:underline">Support@bluelocken.com</a></>
                    ) : isEs ? (
                        <>¿Tienes sugerencias, preguntas o comentarios? Estaremos encantados de ayudarte:<br />Correo: <a href="mailto:Support@bluelocken.com" className="text-bb-blue hover:underline">Support@bluelocken.com</a></>
                    ) : (
                        <>Have suggestions, technical feedback, or questions? We're always eager to improve :<br />Email: <a href="mailto:Support@bluelocken.com" className="text-bb-blue hover:underline">Support@bluelocken.com</a></>
                    )}
                </p>

                <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-xl mt-12 border border-gray-200 dark:border-white/10">
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        <strong>Disclaimer:</strong> This website is an independent fan project and is not affiliated with Muneyuki Kaneshiro, Yusuke Nomura, Kodansha, or VIZ Media. All manga content, characters, and trademarks remain the property of their respective copyright holders.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
