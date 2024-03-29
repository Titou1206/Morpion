//je récupère les éléments jouer, rejouer et phrase
let jouer = document.getElementById("jouer");
let rejouer = document.getElementById("rejouer");
let phrase = document.getElementById("phrase")
//je récupère dans un tableau dtoutes les cases du morpion dans un tableau cases que je decoupe en triplé gagnant
let cases = document.querySelectorAll(".morpion-case");
const tripleGagnant=[[cases[0],cases[1],cases[2]],[cases[0],cases[3],cases[6]],[cases[0],cases[4],cases[8]],[cases[1],cases[4],cases[7]],[cases[2],cases[4],cases[6]],[cases[2],cases[5],cases[8]],[cases[3],cases[4],cases[5]],[cases[6],cases[7],cases[8]]]
//initialisation joueur, jeu et vainqueur
let jeu = 0; //jeu bloqué
let j=1; //initialisation du joueur à jouer (0=j1, 1=j2)
let p = 0; //initialisation de la partie (p=0, j1 commence / p=1, j2 commence)
let j1 = 0;
let j2 = 0;

//je surveille le click sur les bouton jouer et rejouer et lance la fonction qui lui correspond 
jouer.addEventListener("click", demarrer);
rejouer.addEventListener("click", redemarrer);

//je cré la fonction démarrer:
function demarrer(e){
    //j'ajoute la class display-none  au btn jouer pour qu'il disparaisse
    jouer.classList.add("display-none");
    //je retire la class display-none au btn rejouer et à la phrase pour qu'ils apparaissent
    rejouer.classList.remove("display-none");
    phrase.classList.remove("display-none");
    //psuivant.classList.remove("display-none");
    //j'active le jeu
    jeu = 1
}

//je cré la fonction redémarrer
function redemarrer(e){
    //pour chaque case du tableau de case
    cases.forEach(elt=>{
        //je supprime toute s les classe lié à coche
        elt.classList.remove("croix");
        elt.classList.remove("rond");
        elt.classList.remove("coche");
        
    })
    //je modifie la phrase pour qu'elle affiche: Le jeu commence, c'est au tour du joueur 1
    phrase.innerText = "Le jeu commence, c'est au tour du joueur 1";
    phrase.classList.remove("v1");
    phrase.classList.remove("v2");
    phrase.classList.remove("mnul")
    //psuivant.classList.remove("display-none");
    //je réinitialise le joueur et réactive le jeu
    j=1;
    jeu=1
    j1 = 0;
    j2 = 0
}


// Option partie suivante : il faut raj un btn partie suivante
/*
function partieSuivante(e){
    //pour chaque case du tableau de case
    cases.forEach(elt=>{
        //je supprime toute s les classe lié à coche
        elt.classList.remove("croix");
        elt.classList.remove("rond");
        elt.classList.remove("coche");
        
    })
    phrase.classList.remove("v1");
    phrase.classList.remove("v2");
    phrase.classList.remove("mnul")
    //je modifie la phrase pour qu'elle affiche: Le jeu commence, c'est au tour du joueur 1
    if(p===1){
        j=-1;
        phrase.innerText = "Partie suivante, c'est au tour du joueur 2";
    }else if(p===-1){
        j=1;
        phrase.innerText = "Partie suivante, c'est au tour du joueur 1";
    }
    jeu = 1;
    p = p * -1;
}*/


//pour chaque case du tableau cases
cases.forEach( elt => {
    //je surveille le click et lance la fonction coche
    elt.addEventListener("click", (e)=>{
        coche(elt);
        vainqueurPartie(elt);
        //vainqueurMatch(elt);
    })
})

//fonction coche
function coche(elt){
    //j'interoge si la case coché contien la classe coche
    let coche = elt.classList.contains("coche")
    //si j est impaire, que la case n'est pas coché et que le jeu est actif et que pas de vainqueur
    if(j === 1 && coche === false && jeu === 1){
        //j'ajoute la classe croix à la case cocher
        elt.classList.add("croix");
        elt.classList.add("coche");
        //je modifie la phrase pour indiquer que c'est au tour du joueur 2
        phrase.innerText = "C'est au tour du Joueur 2";
        //j'incrémente j de 1
        j = j * -1;
    //sinon si j est paire , que la case n'est pas coché et que le jeu est actif et que pas de vainqueur
    }else if(j===-1 && coche === false && jeu === 1){
        //j'ajoute la classe rond à la case cocher
        elt.classList.add("rond");
        elt.classList.add("coche");
        //je modifie la phrase pour indiquer que c'est au tour du joueur 1
        phrase.innerText = "C'est au tour du Joueur 1";
        //j'incrémente j de 1
        j = j * -1;
    }else if(coche===true){
        alert("case occupée");
    }else if(jeu===0 && rejouer.classList.contains("display-none")){
        alert("Partie non démarré, lancez une partie");
    }else if(jeu===0 && jouer.classList.contains("display-none")){
        alert("Partie terminée, lancez une nouvelle partie")
    }
}


//fonction test vainqueur
function vainqueurPartie(elt){
    //si ttes les cases sont coché
    if(cases[0].classList.contains("coche")&&cases[1].classList.contains("coche")&&cases[2].classList.contains("coche")&&cases[3].classList.contains("coche")&&cases[4].classList.contains("coche")&&cases[5].classList.contains("coche")&&cases[6].classList.contains("coche")&&cases[7].classList.contains("coche")&&cases[8].classList.contains("coche")){
        let txt = "Match nul !"
        let winner = "mnul"
        //pour chaque triplé du tableau tripleGagnant
        tripleGagnant.forEach(triple=>{
            //si les 3 cases sont coché d'une croix
            if(triple[0].classList.contains("croix")&&triple[1].classList.contains("croix")&&triple[2].classList.contains("croix")){
                // je change la phrase pour déclarer j1 vainqueur + change le style et met jeu=0 pour stoper jeu
                txt = "VAINQUEUR: Joueur 1 !";
                winner = "v1";
                //+1point pour joueur 1
                j1++;
            }else if(triple[0].classList.contains("rond")&&triple[1].classList.contains("rond")&&triple[2].classList.contains("rond")){
                // je change la phrase pour déclarer j2 vainqueur + change le style et met jeu=0 pour stoper jeu
                txt = "VAINQUEUR: Joueur 2 !";
                winner = "v2";
                //+1point pour joueur 2
                j2++;
            }
        //je change la phrase pour dire quil y a match nul et lui applqiue mle  style mnul et met jeu=0 pour stoper je
        phrase.innerText = txt;
        phrase.classList.add(winner);
        jeu=0;
        }) 
    //sinon
    }else{
        //pour chaque triplé du tableau tripleGagnant
        tripleGagnant.forEach(triple=>{
            //si les 3 cases sont coché d'une croix
            if(triple[0].classList.contains("croix")&&triple[1].classList.contains("croix")&&triple[2].classList.contains("croix")){
                // je change la phrase pour déclarer j1 vainqueur + change le style et met jeu=0 pour stoper jeu
                phrase.innerText = "VAINQUEUR: Joueur 1 !";
                phrase.classList.add("v1");
                jeu = 0;
                //+1point pour joueur 1
                j1++;
            }else if(triple[0].classList.contains("rond")&&triple[1].classList.contains("rond")&&triple[2].classList.contains("rond")){
                // je change la phrase pour déclarer j2 vainqueur + change le style et met jeu=0 pour stoper jeu
                phrase.innerText = "VAINQUEUR: Joueur 2 !";
                phrase.classList.add("v2");
                jeu = 0;
                //+1point pour joueur 2
                j2++;
            }
        })
    }  
}


/*
function vainqueurMatch(elt){
    if(j1===3){
        phrase.innerText = "joueur 1 gagne le MATCH !"
        phrase.classList.add("v1");
        jeu = 0;
        psuivant.classList.add("display-none");
    }else if(j2===3){
        phrase.innerText = "joueur 2 gagne le MATCH !"
        phrase.classList.add("v2");
        jeu = 0;
        psuivant.classList.add("display-none");
    }
}
*/

//reste à modif html