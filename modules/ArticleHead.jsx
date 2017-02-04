import React, {Component} from 'react'
import style from './test.scss'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedDark } from 'react-syntax-highlighter/dist/styles';
const someCodeInJava = `import java.io.*;

public class Main {
  public static void main (String args[]){
    return "hell Yeah";
  }
}
`
const insertCode = (code, lang) => {
  return <SyntaxHighlighter language={lang} style={solarizedDark} showLineNumbers={true}>{code}</SyntaxHighlighter>;
}

let divStyle = {
  padding : 5,
  width : 700,
  margin : 'auto'
}

class ArticleHead extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="hello">
        <div style = {divStyle}>
          <h1 style={{margin : '0.3em'}}>This is ReactJS application</h1>
          <p style={{color : '#c6c6c6', marginLeft : '0.97em'}}>Made with ES6 standard of javascript</p>
        </div>
        <img src="http://placehold.it/650x300" width="100%" />
        <div style = {divStyle} className="article">

          <h1>Torquatus, is qui consul cum Cn.</h1>

<p>The first version of a company’s culture emerges organically. It will be some blend of your company’s mission, the personality and working style of of your founder(s), and the first 5–10 hires. Often, in the early days of a new, growing company, the excitement about the mission you’re on and the product you’re building will be enough to power a good culture. But that culture has a shelf life.</p>

<h2>Quarum ambarum rerum cum medicinam pollicetur, luxuriae licentiam pollicetur.</h2>

<p>Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Dic in quovis conventu te omnia facere, ne doleas. Nunc omni virtuti vitium contrario nomine opponitur. Qui si omnes veri erunt, ut Epicuri ratio docet, tum denique poterit aliquid cognosci et percipi. Tanti autem aderant vesicae et torminum morbi, ut nihil ad eorum magnitudinem posset accedere. De quibus cupio scire quid sentias. <code>Poterat autem inpune;</code> An est aliquid per se ipsum flagitiosum, etiamsi nulla comitetur infamia? </p>
{insertCode(someCodeInJava, 'java')}


<ul>
	<li>Bonum incolumis acies: misera caecitas.</li>
	<li>In quibus doctissimi illi veteres inesse quiddam caeleste et divinum putaverunt.</li>
	<li>Cognitio autem haec est una nostri, ut vim corporis animique norimus sequamurque eam vitam, quae rebus iis ipsis perfruatur.</li>
</ul>


<h3>Quid est enim aliud esse versutum?</h3>

<p>Quia nec honesto quic quam honestius nec turpi turpius. Quid ergo aliud intellegetur nisi uti ne quae pars naturae neglegatur? Stoicos roga. <code>Philosophi autem in suis lectulis plerumque moriuntur.</code> Et certamen honestum et disputatio splendida! omnis est enim de virtutis dignitate contentio. </p>



        </div>

      </div>

    );
  }
}


export default ArticleHead
