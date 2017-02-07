import React , {Component} from 'react'
var hljs = require('highlight.js')

let divStyle = {
  padding : 5,
  width : 700,
  margin : 'auto'
}

class ArticleContent extends Component{

  componentDidUpdate(){
       this.highlightCode();
   }

  render(){
    let contentHtml = this.props.content;
    return (

      <div className="article-content" >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Zenonis est, inquam, hoc Stoici. Eodem modo is enim tibi nemo dabit, quod, expetendum sit, id esse laudabile. Potius inflammat, ut coercendi magis quam dedocendi esse videantur. Non igitur potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Ut optime, secundum naturam affectum esse possit. Duo Reges: constructio interrete. Illa sunt similia: hebes acies est cuipiam oculorum, corpore alius senescit; </p>

        <p>Istam voluptatem, inquit, Epicurus ignorat? Philosophi autem in suis lectulis plerumque moriuntur. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Vos autem cum perspicuis dubia debeatis illustrare, dubiis perspicua conamini tollere. </p>

        <p>Ab his oratores, ab his imperatores ac rerum publicarum principes extiterunt. Quae iam oratio non a philosopho aliquo, sed a censore opprimenda est. Si longus, levis. Quem Tiberina descensio festo illo die tanto gaudio affecit, quanto L. Venit ad extremum; Hoc sic expositum dissimile est superiori. </p>

        <ul>
        <li>Aeque enim contingit omnibus fidibus, ut incontentae sint.</li>
        <li>Non potes, nisi retexueris illa.</li>
        <li>Potius inflammat, ut coercendi magis quam dedocendi esse videantur.</li>
        <li>Frater et T.</li>
        </ul>


        <p>Esse enim quam vellet iniquus iustus poterat inpune. Ita relinquet duas, de quibus etiam atque etiam consideret. Neque enim disputari sine reprehensione nec cum iracundia aut pertinacia recte disputari potest. Quae quo sunt excelsiores, eo dant clariora indicia naturae. </p>

        <p>Certe non potest. Nonne igitur tibi videntur, inquit, mala? Duo enim genera quae erant, fecit tria. </p>

        <pre>
        <code>

        </code>
        </pre>
      </div>
    );
  }

  highlightCode() {
    console.log("Starting highlights")
    var _codeBlocks = document.getElementsByTagName('code');
    for (var i = 0, j = _codeBlocks.length; i<j; ++i) {
        hljs.highlightBlock(_codeBlocks[i]);
        console.log(_codeBlocks[i]);
    }
  }
}

export default ArticleContent;
