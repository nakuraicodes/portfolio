import '../components/icon.js';
import '../components/button-to-top.js';

const style = `
a {
    color: rgb(0, 80, 17);
}
a:visited {
    color: rgb(0, 160, 35);
}
.container{
  text-align: justify;
  text-justify: inter-word;
  padding-bottom: 100px;
}
iframe{
  width: 100%
  min-height: 315px;
}
.yt-video{
  width: 50%;
  min-width: 300px;
  height: 315px;
  min-height: 315px;
}
.top-button-container{
  display:flex; 
  justify-content:flex-end;
  flex-direction:row;
}
.top-button{
  border: 1px solid gray; 
  border-radius: 4px; 
  height:50px; 
  width:50px;
  text-align:center;
  cursor: pointer;
}
`;
const template = `
  <style>${style}</style>
  <div class="container">
    <h3>Here is what I have been working on my own time</h3>
    <article>
      <h4>A chess game</h4>
      <p>
        I have always wanted to make my own chess logic. I had tried in the past, trying to build optimized version first. This time I focused on the "Make it work, make it good, make it fast" rule.
        Well, I made it work!
        <br/>
        You can see the code here: <a href="https://github.com/Nakurai/go-chess-game" title="outside link to the github page of nakurai"
        target="__blank">Chess Game on Github <nc-icon size="small" icon="open_in_new"></nc-icon></a> <br/>
      </p>
    </article>
    <article>
      <h4>Forget Me Not</h4>
      <p>
        This is a micro journalling web application you can use today! It's quite minimalist, and we welcome any feedback!
        <br/>
        You can see the code here: <a href="https://forgetmenot.so" title="outside link to the Forget Me Not website"
        target="__blank">Forget Me Not <nc-icon size="small" icon="open_in_new"></nc-icon></a> <br/>
      </p>
    </article>
    <article>
      <h4>Gentle Finance</h4>
      <p>
        I have never found the existing personal finance applications satifying. I think they all are quite complex and hard to wrap your head around, or miss some basic feature. I decided to create my own, and it's open to new users! With 
        it you can track your expenses easily just by using sms.<br/>
        You can request access to the beta version here: <a href="https://gentlefi.com/" title="outside link to the gentle finance landing page"
        target="__blank">Gentle Finance <nc-icon size="small" icon="open_in_new"></nc-icon></a> <br/>
      </p>
    </article>
    <article>
      <h4>I am a Mentor!</h4>
      <p>
        I strongly believe that coding can be an extraordinary experience. It brings understanding to the world we live in, the potential to
        express yourself, the ability to connect without borders or langage. It's a true component of freedom and independance. I am 
        glad to bring my expertise and help people improve in this area.<br/>
        You can hire me on this page: <a href="https://mentorcruise.com/mentor/ChristopheMamessier/" title="outside link to my mentorin page"
        target="__blank">Christophe Mamessier on MentorCruise <nc-icon size="small" icon="open_in_new"></nc-icon></a> <br/>
      </p>
    </article>
    <article>
      <h4>Sharing Fairy</h4>
      <p>
        This is my first attempt at creating a decentralized application. The idea is that people can create groups on their devices,
        and any device that would join the group will be able to share fiels with them. It's handy if you need to share the same file
        with several people without relying on the need of everybody having to use the same tool. <br/>
        The website does not collect any personal information. All the files shared are discarded as soon as the page is closed. <br/>
        You can find the website here: 
        <a href="https://sharing-fairy.web.app" title="outside link to the Sharing Fairy website" target="__blank">Sharing Fairy&nbsp;<nc-icon size="small" icon="open_in_new"></nc-icon></a> <br/>
        The code is publicly available.
      </p>
    </article>
    <article>
      <h4>YouTube Channel</h4>
      <p>
        It's quite common to see developers sharing advice and tips on YouTube. I have a playlist related to Reactjs and Firebase. In this playlist,
        I show you exaclty how to setup a Reactjs project from the start, and slowly build up toward a fully functional application. 
        At the end of the playlist, your user can actually create an account on your website, and you can decide what to do next. <br/>
        Here is the link to my channel: <a href="https://www.youtube.com/channel/UCB8PvH3XpU2fsDtWirKFvaA" title="outside link to my YouTube Channel" target="__blank">Nakurai Codes <nc-icon size="small" icon="open_in_new"></nc-icon></a>.
      </p>
      <video class="yt-video" controls="controls" src="res/video/react-firebase-auth-introduction.mp4"></video>
      
    </article>
    <article>
      <h4>Cellular Automaton</h4>
      <p>
        I have played around with Web Components and created a visualization of the Conway's Game of Life (
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="__blank" title="Wikipedia article regarding Conway's Game of Life">
         Wikipedia<nc-icon size="small" icon="open_in_new"></nc-icon></a>).
        It's actually on this website. <a href="#game-of-life" title="go to Conway's game of life's visualization"> You can check it out here </a>.
      </p>
    </article>
    <article>
      <h4>Some algebra</h4>
      <p>
        I have played around with a naive implementation of matrices. Here is a small tool to practice "multiplying" them:
        <a href="#calculus" title="practice matrices dot product"> Practice matrice dot product</a>.
      </p>
    </article>
    <article>
      <h4>My Blog</h4>
      <p>
       Maybe you already visited it by clicking on the menu item. It's where I share what I have learned while coding my projects. It's almost 
       only about technical topics. I want it to be as useful and straightforward as possible.
      </p>
    </article>

    <nc-button-to-top></nc-button-to-top>
  </div>
`;

class Projects extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const componentTemplate = document.createElement('template');
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
  }
}

customElements.define('nc-page-projects', Projects);
export const info = { routeId: 'projects' };
