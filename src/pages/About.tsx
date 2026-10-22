import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';
const disciplines=[
 {title:L('Python и автоматизация','Python & automation'),text:L('Telegram-боты, фильтры, уведомления, взаимодействие с API и данные в SQLite. В Prime Market проверяю рабочие сценарии и поведение функций.','Telegram bots, filters, notifications, API integrations and SQLite data. In Prime Market I verify workflows and feature behaviour.')},
 {title:L('C++20 и поиск','C++20 & search'),text:L('Развиваю ReSearchify: структура индекса, поиск по словам, фразам и regex. Проверяю скорость и корректность результатов на больших проектах.','Developing ReSearchify: index structure and word, phrase and regex search. I test speed and correctness on large codebases.')},
 {title:L('Продукты и интерфейсы','Products & interfaces'),text:L('Продумываю требования, навигацию, внешний вид и взаимодействия. Работаю над сайтами своих проектов и тестирую новые версии.','Requirements, navigation, visual design and interactions. I work on my projects’ websites and test new versions.')},
 {title:L('Видео и монтаж','Video & editing'),text:L('Около трёх лет в DaVinci Resolve. Создаю игровые видео, работаю с темпом, цветокоррекцией, анимацией и VFX.','Around three years in DaVinci Resolve. I create gaming videos, working with pacing, colour correction, animation and VFX.')}
];
const advantages=[
 {title:L('Нестандартное мышление','Creative problem-solving'),text:L('Пробую разные варианты, пока не найду подход, которым удобно пользоваться.','I try different approaches until I find one that is genuinely convenient.')},
 {title:L('Внимание к деталям','Attention to detail'),text:L('Проверяю поведение функций, замечаю неудобства и составляю подробные баг-репорты.','I test how features behave, spot usability issues and write detailed bug reports.')},
 {title:L('Самостоятельность','Ownership'),text:L('Определяю задачи и принимаю решения о развитии собственных проектов.','I define problems and make development decisions for my own projects.')},
 {title:L('Упорство','Persistence'),text:L('Возвращаюсь к сложной задаче, когда вижу, что результат можно сделать лучше.','I return to a difficult problem when I can see room for a better result.')}
];
export default function About(){const{t}=useLanguage();return <>
 <PageHeading title={t(L('Как я работаю','How I work'))} desc={t(L('Совмещаю программирование, собственные продукты, интерфейсы и медиаконтент.','Combining programming, personal products, interfaces and media.'))}/>
 <section className="shell v6-about-intro"><div><h2>{t(L('Я — R1SK.','I’m R1SK.'))}</h2><p>{t(L('Мне нравится делать свои инструменты и понимать, как они устроены. Продумываю требования, проверяю результат и возвращаюсь к деталям, которые мешают работе.','I like building my own tools and understanding how they work. I define requirements, test the result and revisit details that get in the way.'))}</p></div><p className="v6-about-aside">{t(L('Первым серьёзным проектом стал Prime Market. С ним понял, насколько интересно работать не только с отдельной функцией, но и с продуктом целиком.','Prime Market was my first serious project. It showed me how much I enjoy working on a whole product rather than just individual features.'))}</p></section>
 <section className="shell v6-about-development"><header className="v6-section-intro"><h2>{t(L('Практика','Hands-on work'))}</h2></header><div className="v6-experience-list">{disciplines.map((item,index)=><article key={index}><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>)}</div></section>
 <section className="shell v6-adv-section"><header className="v6-section-intro"><h2>{t(L('Мой подход','My approach'))}</h2></header><div className="v6-adv-list">{advantages.map((item,index)=><article key={index}><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>)}</div></section>
 <section className="shell quiet-roadmap-link"><div><h2>{t(L('Путь и планы','Experience & direction'))}</h2><p>{t(L('Монтаж, игровые проекты и разработка собственных инструментов.','Editing, game projects and developing my own tools.'))}</p></div><Link to="/roadmap/" className="quiet-round-link" aria-label={t(L('Открыть Roadmap','Open roadmap'))}><ArrowUpRight size={24} aria-hidden="true"/></Link></section>
 </>};
