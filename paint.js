var deuxiemeTbl = false;
var couleur = "rgb(215, 130, 55)";
var maintient = false;
var dico_retour = {"taiSty" : [], "num_cas" : [], "pre_coul" : [], "coul" : [], "all_case_modif" : []};
var dico_avance = {"taiSty" : [], "num_cas" : [], "pre_coul" : [], "coul" : [], "all_case_modif" : []};
var opt = 0;
var copier_forme = false;
var rectangle_bool = false;
var dico_copier = {"liste_num_case" : [], "case_origine" : 0};
var couleur_utiliser = [];
var data_open = "";

function generate_table() {
	lig = document.getElementById("lig").value;
	col = document.getElementById("col").value;
	tai = document.getElementById("tai").value;
	if (lig == 0 && lig == ""){
		lig = 20;
	}
	if (col == 0 && col == ""){
		col = 50;
	}
	if (tai == 0 && tai == ""){
		tai = 20;
	}
	var body = document.getElementById("place_tbl");
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	tbl.id = "tableau";
	for (var i = 0; i < lig; i++) {
		var row = document.createElement("tr");
		for (var j = 0; j < col; j++) {
			var cell = document.createElement("td");
			cell.style.width = tai+"px";
			cell.style.height = tai+"px";
			cell.className = "td";
			var test_fond_tbl = document.getElementById("coul_fond").checked;
			if ( test_fond_tbl == true){
				var couleur = document.getElementById("prevesu").style.backgroundColor;
				cell.style.backgroundColor = couleur;
			} else {
				cell.style.backgroundColor = "rgb(255,255,255";

			}
			var cellText = document.createTextNode("");
			cell.setAttribute("onMouseOver","maintient_change("+(j+(i*col))+");");
			cell.setAttribute("onclick","dessiner("+(j+(i*col))+");");
			cell.id = "case_"+(j+(i*col));
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		tblBody.appendChild(row);
	}
	tbl.appendChild(tblBody);
	body.appendChild(tbl);
	if (deuxiemeTbl == true)
	{
		tbl = document.getElementById("tableau");
		tbl.remove();
	}
	deuxiemeTbl = true;
	var check_cadre = document.getElementById("cadre").checked;
	var check_border = document.getElementById("border").checked;
	persoCadre("cadre", check_cadre);
	persoCadre("border", check_border);
	change_donner('esp_cell');
	dico_retour = {"taiSty" : [], "num_cas" : [], "pre_coul" : [], "coul" : [], "all_case_modif" : []};
	dico_avance = {"taiSty" : [], "num_cas" : [], "pre_coul" : [], "coul" : [], "all_case_modif" : []};
}	

function dessiner(num_case){
	if (opt == 0){
		couleur_utiliser.push(couleur);
		var nouvelle_numcase = parseInt(num_case);
		col = parseInt(col);
		lig = parseInt(lig);
		var tailleStylo = document.getElementById("stylo").value;
		tailleStylo = parseInt(tailleStylo);
		dico_retour.taiSty.push(tailleStylo);
		dico_retour.num_cas.push(nouvelle_numcase);
		dico_retour.coul.push(couleur);
		if (tailleStylo == 1) {
			dico_retour.all_case_modif.push([nouvelle_numcase]);
			var precedCoul = document.getElementById("case_"+nouvelle_numcase);
			stylePreCoul = precedCoul.style.backgroundColor;
			dico_retour.pre_coul.push([stylePreCoul]);
			var ma_case = document.getElementById("case_" + nouvelle_numcase);
			ma_case.style.backgroundColor = couleur;
		}else if (tailleStylo == 2){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = -1; i<2; i=i+2){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase-col; i<nouvelle_numcase+col+1; i=i+col){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = couleur;
				}
			}
		}else if (tailleStylo == 3){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = (-tailleStylo+1); i<(tailleStylo); i++){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = (nouvelle_numcase)-(col*(tailleStylo-1)); i<(nouvelle_numcase)+(col*(tailleStylo-1))+1; i=i+((col)*4)){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase-col-1 ; i < nouvelle_numcase-col+tailleStylo-1 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+col-1 ; i < nouvelle_numcase+col+tailleStylo-1 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
		} else if (tailleStylo == 4){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = (-tailleStylo+1); i<(tailleStylo); i++){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = (nouvelle_numcase)-(col*(tailleStylo-1)); i<(nouvelle_numcase)+(col*(tailleStylo-1))+1; i=i+((col)*6)){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase-col-2 ; i < nouvelle_numcase-col+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+col-2 ; i < nouvelle_numcase+col+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}

			for (i = nouvelle_numcase-col-col-1 ; i < nouvelle_numcase-col-col+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+col+col-1 ; i < nouvelle_numcase+col+col+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
		}else if (tailleStylo == 5){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = (-tailleStylo+1); i<(tailleStylo); i++){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = (nouvelle_numcase)-(col*(tailleStylo-1)); i<(nouvelle_numcase)+(col*(tailleStylo-1))+1; i=i+((col)*(tailleStylo+3))){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase-col-3 ; i < nouvelle_numcase-col+4 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+col-3 ; i < nouvelle_numcase+col+4 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}

			for (i = nouvelle_numcase-(col*(tailleStylo-2))-1 ; i < nouvelle_numcase-(col*(tailleStylo-2))+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-2)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-2))-1 ; i < nouvelle_numcase+(col*(tailleStylo-2))+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-2)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}

			for (i = nouvelle_numcase-(col*(tailleStylo-3))-2 ; i < nouvelle_numcase-(col*(tailleStylo-3))+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-3)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-3))-2 ; i < nouvelle_numcase+(col*(tailleStylo-3))+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-3)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
		}else if (tailleStylo == 6){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = (-tailleStylo+1); i<(tailleStylo); i++){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = (nouvelle_numcase)-(col*(tailleStylo-1)); i<(nouvelle_numcase)+(col*(tailleStylo-1))+1; i=i+((col)*(tailleStylo+4))){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase-col-4 ; i < nouvelle_numcase-col+5 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+col-4 ; i < nouvelle_numcase+col+5 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}

			for (i = nouvelle_numcase-(col*(tailleStylo-3))-2 ; i < nouvelle_numcase-(col*(tailleStylo-3))+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-3)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-3))-2 ; i < nouvelle_numcase+(col*(tailleStylo-3))+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-3)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}

			for (i = nouvelle_numcase-(col*(tailleStylo-4))-3 ; i < nouvelle_numcase-(col*(tailleStylo-4))+4 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-4)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-4))-3 ; i < nouvelle_numcase+(col*(tailleStylo-4))+4 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-4)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase-(col*(tailleStylo-2))-1 ; i < nouvelle_numcase-(col*(tailleStylo-2))+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-2)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-2))-1 ; i < nouvelle_numcase+(col*(tailleStylo-2))+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-2)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = couleur;
				}
			}
		}
		dico_avance = {"taiSty" : [], "num_cas" : [], "pre_coul" : [], "coul" : [], "all_case_modif" : []};
	} else if (opt == 1){
		couleur_utiliser.push(couleur);
		nouvelle_numcase = parseInt(num_case);
		dico_retour.taiSty.push(4);
		dico_retour.num_cas.push(nouvelle_numcase);
		dico_retour.coul.push(couleur);
		var precedCoul = document.getElementById("case_"+nouvelle_numcase);
		stylePreCoul = precedCoul.style.backgroundColor;
		var liste_num_case_meme_coul = [nouvelle_numcase];
		regarde_autour(liste_num_case_meme_coul);
	} else if (opt == 2){
		nouvelle_numcase = parseInt(num_case);
		dico_retour.taiSty.push(4);
		dico_retour.num_cas.push(nouvelle_numcase);
		dico_retour.coul.push(couleur);
		var precedCoul = document.getElementById("case_"+nouvelle_numcase);
		stylePreCoul = precedCoul.style.backgroundColor;
		var liste_num_case_meme_coul = [nouvelle_numcase];
		copier(liste_num_case_meme_coul,copier_forme, num_case);
		if (copier_forme == false){
			copier_forme=true;
		} else {
			couleur_utiliser.push(couleur);
			copier_forme=false;
		}
	} else if (opt == 3){
		var nouvelle_numcase = parseInt(num_case);
		var coul_case = document.getElementById("case_"+nouvelle_numcase).style.backgroundColor;
		coul_case = coul_case.slice(4,-1);
		coul_case = coul_case.split(", ");
		var div_jauge_coul = document.getElementById("form_jauge");
		var div_conteneur = document.getElementById("div1");
		div_jauge_coul.remove();
		var form = document.createElement("form");
		form.id = "form_jauge"
		form.method = "post"
		var input_red = document.createElement("input");
		input_red.setAttribute("onclick", "charger();");
		input_red.setAttribute("data-min", "0");
		input_red.setAttribute("data-max", "255");
		input_red.setAttribute("data-color", "#ff0000");
		input_red.setAttribute("data-taille", "80");
		input_red.id ="rouge";
		input_red.type = "text";
		input_red.name = "compteur";
		input_red.className = "compteur";
		input_red.value =  coul_case[0];
		var input_blue = document.createElement("input");
		input_blue.setAttribute("onclick", "charger();");
		input_blue.setAttribute("data-min", "0");
		input_blue.setAttribute("data-max", "255");
		input_blue.setAttribute("data-color", "#0000FF");
		input_blue.setAttribute("data-taille", "80");
		input_blue.id ="bleu";
		input_blue.type = "text";
		input_blue.name = "compteur";
		input_blue.className = "compteur";
		input_blue.value =  coul_case[2];
		var input_green = document.createElement("input");
		input_green.setAttribute("onclick", "charger();");
		input_green.setAttribute("data-min", "0");
		input_green.setAttribute("data-max", "255");
		input_green.setAttribute("data-color", "#00FF00");
		input_green.setAttribute("data-taille", "80");
		input_green.id ="vert";
		input_green.type = "text";
		input_green.name = "compteur";
		input_green.className = "compteur";
		input_green.value =  coul_case[1];
		form.appendChild(input_red);
		form.appendChild(input_green);
		form.appendChild(input_blue	);
		div_conteneur.appendChild(form);
		create_jauge();
	} else if (opt == 4){
		couleur_utiliser.push(couleur);
		dico_retour.taiSty.push(4);
		dico_retour.num_cas.push(nouvelle_numcase);
		dico_retour.coul.push(couleur);
		liste_num_case_meme_coul = [];
		list_case_coul = [];
		var nouvelle_numcase = parseInt(num_case);
		var coul_case = document.getElementById("case_"+nouvelle_numcase).style.backgroundColor;
		for (i = 0 ; i< col*lig;i++){
			ma_case = document.getElementById("case_"+i);
			if (ma_case.style.backgroundColor == coul_case){
				liste_num_case_meme_coul.push(i);
				list_case_coul.push(coul_case);
				ma_case.style.backgroundColor = couleur;
			}
		}
		dico_retour.all_case_modif.push(liste_num_case_meme_coul);
		dico_retour.pre_coul.push(list_case_coul);
	}else if (opt == 5) {
		if (rectangle_bool == false) {
			preced_num_case = rectangle(rectangle_bool, num_case);
			rectangle_bool = true;
		} else {
			couleur_utiliser.push(couleur);
			dico_retour.taiSty.push(4);
			dico_retour.num_cas.push(nouvelle_numcase);
			dico_retour.coul.push(couleur);
			mes_liste = rectangle(rectangle_bool, num_case, preced_num_case);
			dico_retour.pre_coul.push(mes_liste.list_case_coul);
			dico_retour.all_case_modif.push(mes_liste.liste_num_case_meme_coul);
			rectangle_bool = false;
		}
	} else if (opt == 6) {
		var nouvelle_numcase = parseInt(num_case);
		var coul_2 = document.getElementById("case_"+nouvelle_numcase).style.backgroundColor;
		new_coul = melange(couleur, coul_2);
		couleur_utiliser.push(new_coul);
		col = parseInt(col);
		lig = parseInt(lig);
		var tailleStylo = document.getElementById("stylo").value;
		tailleStylo = parseInt(tailleStylo);
		dico_retour.taiSty.push(tailleStylo);
		dico_retour.num_cas.push(nouvelle_numcase);
		dico_retour.coul.push(new_coul);
		if (tailleStylo == 1) {
			dico_retour.all_case_modif.push([nouvelle_numcase]);
			var precedCoul = document.getElementById("case_"+nouvelle_numcase);
			stylePreCoul = precedCoul.style.backgroundColor;
			dico_retour.pre_coul.push([stylePreCoul]);
			var ma_case = document.getElementById("case_" + nouvelle_numcase);
			ma_case.style.backgroundColor = new_coul;
		}else if (tailleStylo == 2){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = -1; i<2; i=i+2){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase-col; i<nouvelle_numcase+col+1; i=i+col){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = new_coul;
				}
			}
		}else if (tailleStylo == 3){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = (-tailleStylo+1); i<(tailleStylo); i++){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = (nouvelle_numcase)-(col*(tailleStylo-1)); i<(nouvelle_numcase)+(col*(tailleStylo-1))+1; i=i+((col)*4)){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase-col-1 ; i < nouvelle_numcase-col+tailleStylo-1 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+col-1 ; i < nouvelle_numcase+col+tailleStylo-1 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
		} else if (tailleStylo == 4){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = (-tailleStylo+1); i<(tailleStylo); i++){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = (nouvelle_numcase)-(col*(tailleStylo-1)); i<(nouvelle_numcase)+(col*(tailleStylo-1))+1; i=i+((col)*6)){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase-col-2 ; i < nouvelle_numcase-col+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+col-2 ; i < nouvelle_numcase+col+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}

			for (i = nouvelle_numcase-col-col-1 ; i < nouvelle_numcase-col-col+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+col+col-1 ; i < nouvelle_numcase+col+col+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
		}else if (tailleStylo == 5){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = (-tailleStylo+1); i<(tailleStylo); i++){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = (nouvelle_numcase)-(col*(tailleStylo-1)); i<(nouvelle_numcase)+(col*(tailleStylo-1))+1; i=i+((col)*(tailleStylo+3))){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase-col-3 ; i < nouvelle_numcase-col+4 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+col-3 ; i < nouvelle_numcase+col+4 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}

			for (i = nouvelle_numcase-(col*(tailleStylo-2))-1 ; i < nouvelle_numcase-(col*(tailleStylo-2))+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-2)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-2))-1 ; i < nouvelle_numcase+(col*(tailleStylo-2))+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-2)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}

			for (i = nouvelle_numcase-(col*(tailleStylo-3))-2 ; i < nouvelle_numcase-(col*(tailleStylo-3))+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-3)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-3))-2 ; i < nouvelle_numcase+(col*(tailleStylo-3))+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-3)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
		}else if (tailleStylo == 6){
			leng_dico = dico_retour.all_case_modif.length;
			dico_retour.all_case_modif.push([]);
			dico_retour.pre_coul.push([]);
			for (i = (-tailleStylo+1); i<(tailleStylo); i++){
				if (Math.floor(nouvelle_numcase/col) == Math.floor((nouvelle_numcase+i)/col)){
					dico_retour.all_case_modif[leng_dico].push(nouvelle_numcase+i);
					var precedCoul = document.getElementById("case_"+(nouvelle_numcase+i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					var ma_case = document.getElementById("case_" + (nouvelle_numcase+i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = (nouvelle_numcase)-(col*(tailleStylo-1)); i<(nouvelle_numcase)+(col*(tailleStylo-1))+1; i=i+((col)*(tailleStylo+4))){
				if (i > -1 && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + i);
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase-col-4 ; i < nouvelle_numcase-col+5 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-col)/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+col-4 ; i < nouvelle_numcase+col+5 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+col)/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}

			for (i = nouvelle_numcase-(col*(tailleStylo-3))-2 ; i < nouvelle_numcase-(col*(tailleStylo-3))+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-3)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-3))-2 ; i < nouvelle_numcase+(col*(tailleStylo-3))+3 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-3)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}

			for (i = nouvelle_numcase-(col*(tailleStylo-4))-3 ; i < nouvelle_numcase-(col*(tailleStylo-4))+4 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-4)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-4))-3 ; i < nouvelle_numcase+(col*(tailleStylo-4))+4 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-4)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase-(col*(tailleStylo-2))-1 ; i < nouvelle_numcase-(col*(tailleStylo-2))+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase-(col*(tailleStylo-2)))/col) && i > -1){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
			for (i = nouvelle_numcase+(col*(tailleStylo-2))-1 ; i < nouvelle_numcase+(col*(tailleStylo-2))+2 ; i++) {
				if (Math.floor((i)/col) == Math.floor((nouvelle_numcase+(col*(tailleStylo-2)))/col) && i < col*lig){
					var precedCoul = document.getElementById("case_"+(i));
					stylePreCoul = precedCoul.style.backgroundColor;
					new_coul = melange(couleur, stylePreCoul);
					dico_retour.pre_coul[leng_dico].push(stylePreCoul);
					dico_retour.all_case_modif[leng_dico].push(i);
					var ma_case = document.getElementById("case_" + (i));
					ma_case.style.backgroundColor = new_coul;
				}
			}
		}
		dico_avance = {"taiSty" : [], "num_cas" : [], "pre_coul" : [], "coul" : [], "all_case_modif" : []};
	}
}

function melange(coul_1,coul_2){
	if (coul_1.slice(0,4) == "rgba"){
		coul_1 = coul_1.slice(5,-3);
		coul_1 = coul_1.split(", ");
	}else {
		coul_1 = coul_1.slice(4,-1);
		coul_1 = coul_1.split(", ");
	}
	if (coul_2.slice(0,4) == "rgba"){
		coul_2 = coul_2.slice(5,-3);
		coul_2 = coul_2.split(", ");
	}else {
		coul_2 = coul_2.slice(4,-1);
		coul_2 = coul_2.split(", ");
	}
	new_coul = [];
	for (x in coul_1){
		new_coul.push((Math.floor(parseInt(coul_1[x])/2))+(Math.floor(parseInt(coul_2[x])/2)));
	}
	new_coul.push(1);
	new_coul = reconstruire_couleur(new_coul);
	return new_coul;
}

function update_historique(){
	couleur_utiliser = couleur_utiliser.filter(function(ele , pos){
		return couleur_utiliser.indexOf(ele) == pos;
	})
	div_conteneur = document.getElementById("liste_coul_histo");
	div_conteneur.remove();
	div_conteneur_parent = document.getElementById("historique");
	var new_div_conteneur = document.createElement("div");
	new_div_conteneur.id = "liste_coul_histo";
	for (i in couleur_utiliser){
		var span_coul = document.createElement("span");
		var span_coul_expl = document.createElement("span");
		span_coul.innerHTML= couleur_utiliser[i];
		span_coul_expl.style.backgroundColor= couleur_utiliser[i];
		transphere = couleur_utiliser[i]
		transphere = transphere.slice(5,-1);
		transphere = transphere.split(",");
		transphere.pop();
		transphere = reconstruire_couleur(transphere, true);
		span_coul_expl.id = "span_historique_back_coul"+i
		span_coul_expl.setAttribute("onclick", "changer_couleur_palette('"+"span_historique_back_coul"+i+"');");
		span_coul_expl.style.padding = "0.1em 1em";
		span_coul_expl.style.margin = "0 5px";
		span_coul_expl.style.border = "1px rgba(0, 0, 0, 0.3) solid";
		span_coul_expl.style.cursor = "pointer"
		var br = document.createElement("br");
		var br2 = document.createElement("br");
		new_div_conteneur.appendChild(span_coul);
		new_div_conteneur.appendChild(span_coul_expl);
		new_div_conteneur.appendChild(br);
		new_div_conteneur.appendChild(br2);
	}
	div_conteneur_parent.appendChild(new_div_conteneur);
	setTimeout("update_historique()", 1000);
}

update_historique();

function reconstruire_couleur(liste, bool=false){
	if(bool == false){
		ma_couleur = "rgba(";
	} else {
		ma_couleur = "rgb("
	}
	longeur_liste = liste.length
	for (x in liste){
		if (longeur_liste-1 == parseInt(x)){
			ma_couleur=ma_couleur+liste[x]+")";
		}else {
			ma_couleur=ma_couleur+liste[x]+",";
		}
	}
	return ma_couleur;
}

function rectangle(bool, num_case, preced_num_case = 0){
	if (bool == false){
		return num_case;
	} else {
		var list_case_coul =[];
		var liste_num_case_meme_coul= [];
		largeur = num_case%col-preced_num_case%col+1;
		longeur = ((num_case-(num_case%col))/col)-((preced_num_case-(preced_num_case%col))/col)+1;
		if (largeur>0){
			for (i=0; i < largeur;i++){
				if (longeur>0){
					for (a=0;a<longeur;a++){
						ma_case_long= document.getElementById("case_"+(preced_num_case+i+(a*col)));
						liste_num_case_meme_coul.push(preced_num_case+i+(a*col));
						list_case_coul.push(ma_case_long.style.backgroundColor);
						ma_case_long.style.backgroundColor = couleur;
					}
				}else {
					for (a=longeur-1;a<1;a++){
						ma_case_long= document.getElementById("case_"+(preced_num_case+i+(a*col)));
						liste_num_case_meme_coul.push(preced_num_case+i+(a*col));
						list_case_coul.push(ma_case_long.style.backgroundColor);
						ma_case_long.style.backgroundColor = couleur;
					}
				}
			}
		}else {
			for (i=largeur-1; i < 1;i++){
				if (longeur>0){
					for (a=0;a<longeur;a++){
						ma_case_long= document.getElementById("case_"+(preced_num_case+i+(a*col)));
						liste_num_case_meme_coul.push(preced_num_case+i+(a*col));
						list_case_coul.push(ma_case_long.style.backgroundColor);
						ma_case_long.style.backgroundColor = couleur;
					}
				}else {
					for (a=longeur-1;a<1;a++){
						ma_case_long= document.getElementById("case_"+(preced_num_case+i+(a*col)));
						liste_num_case_meme_coul.push(preced_num_case+i+(a*col));
						list_case_coul.push(ma_case_long.style.backgroundColor);
						ma_case_long.style.backgroundColor = couleur;
					}
				}
			}

		}
		return { list_case_coul,liste_num_case_meme_coul };
	}
}

function copier(liste,bool, num_case){
	if (bool == false){
		var coul_num_cas = document.getElementById("case_"+liste[0]);
		var ma_coul = coul_num_cas.style.backgroundColor;
		var new_liste = [];

		for (i=0; i< (liste.length); i++){
			for (a = liste[i]-col; a<liste[i]+col+1; a=a+col){
				if(a > -1 && a < col*lig) {
					coul_num_cas_autour = document.getElementById("case_" + a);
					ma_coul_autour = coul_num_cas_autour.style.backgroundColor;
					var present = false;
					for (var x in new_liste) {
						if (new_liste[x] == a) {
							present = true;
						}
					}
					if (ma_coul == ma_coul_autour && present == false) {
						new_liste.push(a);
					}
				}
			}

			for (a = liste[i]-1; a<liste[i]+2; a=a+2){
				if (Math.floor(a/col) == Math.floor(liste[i]/col)) {
					coul_num_cas_autour = document.getElementById("case_" + a);
					ma_coul_autour = coul_num_cas_autour.style.backgroundColor;
					var present = false;
					for (var x in new_liste) {
						if (new_liste[x] == a) {
							present = true;
						}
					}
					if (ma_coul == ma_coul_autour && present == false) {
						new_liste.push(a);
					}
				}
			}
		}
		if (new_liste.length > liste.length){
			copier(new_liste, bool,num_case)
		} else {
			dico_copier = {"liste_num_case" : new_liste, "case_origine" : num_case}
		}
	} else{
		var liste_ma_couleur = [];
		var liste_all_case_mofi = [];
		for (i in dico_copier.liste_num_case){
			if (dico_copier.liste_num_case[i]-(dico_copier.case_origine-num_case) >-1 && dico_copier.liste_num_case[i]-(dico_copier.case_origine-num_case) < col*lig && Math.floor(dico_copier.case_origine/col)-Math.floor((dico_copier.liste_num_case[i])/col) == Math.floor(num_case/col)-Math.floor((dico_copier.liste_num_case[i]-(dico_copier.case_origine-num_case))/col)){
				changer_la_coul = document.getElementById("case_"+(dico_copier.liste_num_case[i]-(dico_copier.case_origine-num_case)));
				liste_ma_couleur.push(changer_la_coul.style.backgroundColor);
				liste_all_case_mofi.push(dico_copier.liste_num_case[i]-(dico_copier.case_origine-num_case))
				changer_la_coul.style.backgroundColor = couleur;
			}
		}
		dico_retour.all_case_modif.push(liste_all_case_mofi);
		dico_retour.pre_coul.push(liste_ma_couleur);
	}
}

function regarde_autour(liste){
	var coul_num_cas = document.getElementById("case_"+liste[0]);
	var ma_coul = coul_num_cas.style.backgroundColor;
	var new_liste = [];

	for (i=0; i< (liste.length); i++){
		for (a = liste[i]-col; a<liste[i]+col+1; a=a+col){
			if(a > -1 && a < col*lig){
				coul_num_cas_autour = document.getElementById("case_"+a);
				ma_coul_autour = coul_num_cas_autour.style.backgroundColor;
				var present = false;
				for (var x in new_liste){
					if (new_liste[x] == a){
						present = true ;
					}
				}
				if (ma_coul == ma_coul_autour && present == false){
					new_liste.push(a);

				}
			}
		}

		for (a = liste[i]-1; a<liste[i]+2; a=a+2){
			if (Math.floor(a/col) == Math.floor(liste[i]/col)){
				coul_num_cas_autour = document.getElementById("case_"+a);
				ma_coul_autour = coul_num_cas_autour.style.backgroundColor;
				var present = false;
				for (var x in new_liste){
					if (new_liste[x] == a){
						present = true;
					}
				}
				if (ma_coul == ma_coul_autour && present == false){
					new_liste.push(a);

				}
			}
		}
	}
	if (new_liste.length > liste.length){
		regarde_autour(new_liste)
	} else {
		for (i in new_liste){
			changer_la_coul = document.getElementById("case_"+new_liste[i]);
			changer_la_coul.style.backgroundColor = couleur;
		}
		var liste_ma_couleur = [];
		for (i = 0; i< new_liste.length; i++){
			liste_ma_couleur.push(stylePreCoul);
		}
		dico_retour.all_case_modif.push(new_liste);
		dico_retour.pre_coul.push(liste_ma_couleur);
	}
}

function change_couleur(){
	var rouge = document.getElementById("rouge").value;
	var vert = document.getElementById("vert").value;
	var bleu = document.getElementById("bleu").value;
	var pre = document.getElementById("prevesu");
	var input_durete = document.getElementById("durete").value;
	couleur = "rgba("+rouge+", "+vert+", "+bleu+","+input_durete+")";
	pre.style.backgroundColor = couleur
	setTimeout('change_couleur()',50);
}

change_couleur();

function maintient_change(id_case){
	if (maintient == true){
		dessiner(id_case);
	}
}

function changer_outil_selected(){
	mon_outil = document.getElementById("select_outil");
	if (mon_outil.selectedIndex == 6){
		mon_outil.selectedIndex = 0
	}else {
		mon_outil.selectedIndex = mon_outil.selectedIndex+1
	}
	change_outil();
	afficher_outil();
}

function afficher_outil(){
	affiche = document.getElementById("afficher_direct_outil");
	new_text = document.forms["form_outil"]["select_outil"][opt].innerHTML;
	pre_img = document.getElementById("image_outil");
	if (pre_img !== null) {
		pre_img.remove();
	}
	var img = document.createElement("img");
	img.title = new_text;
	img.alt = new_text;
	img.src = "Outils/"+opt+".png";
	img.id = "image_outil"
	affiche.appendChild(img);


	if (opt ==6){
		apr_opt =0;
	}else {
		apr_opt = opt+1;
	}
	affiche = document.getElementById("afficher_direct_outil_prochain");
	new_text_2 = document.forms["form_outil"]["select_outil"][apr_opt].innerHTML;
	pre_img = document.getElementById("image_outil2");
	if (pre_img !== null) {
		pre_img.remove();
	}
	var img = document.createElement("img");
	img.title = new_text_2;
	img.alt = new_text_2;
	img.src = "Outils/"+apr_opt+".png";
	img.id = "image_outil2"
	affiche.appendChild(img);
}

document.addEventListener('keydown', (event) => {
	const nomTouche = event.key;
	if (nomTouche == "Escape"){
		affiche_parametre(false);
	}
	if (event.ctrlKey) {
		if (nomTouche == "q" || nomTouche == "Q"){
			if (maintient == true){
				maintient = false;
			}else {
				maintient = true;
			}
		} else if (nomTouche == "x" || nomTouche == "X"){
			changer_outil_selected();
		} else if (nomTouche == "z" || nomTouche == "Z"){
			retour();
		} else if (nomTouche == "Y" || nomTouche == "y"){
			avance();
		} else if (nomTouche == "M" || nomTouche == "m"){
			alert('bouh !!!!! ahahahahah, t\'as eu peur hein !!!!!!');
		}
	}
}, false);

function diplay_Checkbox(id_check, id_modifDisplay, check = false) {
	var checkBox = document.getElementById(id_check);
	var text = document.getElementById(id_modifDisplay);

	if (checkBox.checked == check){
		text.style.display = "none";
		if ( id_check == "border" ){
			persoCadre ("border", check);
		} else if ( id_check == "cadre" ) {
			persoCadre("cadre", check);
		}
	} else {
		text.style.display = "block";
		if ( id_check == "border" ){
			persoCadre ("border");
		} else if ( id_check == "cadre" ) {
			persoCadre("cadre");
		}
	}
}

function persoCadre(id_perso, check = true){
	var coul_brd = document.getElementById("coul_brd").value;
	if (id_perso == "border"){
		var mesCases = document.getElementsByClassName("td");
		var tai_border = document.getElementById("tai_border").value;

		for (let i = 0; i < mesCases.length; i++) {
			if (check == true) {
				mesCases[i].style.border = tai_border+"px "+coul_brd+" solid";
			} else {
				mesCases[i].style.border = 0;
			}
		}
	}
	if (id_perso == "cadre"){
		var tbl = document.getElementById("tableau");
		var tai_cadre = document.getElementById("tai_cadre").value;
		if (check == true) {
			tbl.style.border = tai_cadre+"px "+coul_brd+" solid";
		} else {
			tbl.style.border = 0;
		}
	}
}

function change_donner (id_donner){
	if (id_donner == "tai_border" || id_donner == "esp_cell"){
		var donner = document.getElementById(id_donner).value;
		var mesCases = document.getElementsByClassName("td");
		var coul_brd = document.getElementById("coul_brd").value;

		for (let i = 0; i < mesCases.length; i++) {
			if (id_donner == "tai_border"){
				mesCases[i].style.border = donner+"px "+coul_brd+" solid";
			} else {
				maTable = document.getElementById('tableau')
				maTable.style.borderCollapse = "separate";
				if (donner == 0){
					maTable.style.borderCollapse = "collapse";
				}
				maTable.style.borderSpacing = donner+"px";
			}
		}
	}else if (id_donner == "tai_cadre" ){
		var tai_cadre = document.getElementById("tai_cadre").value;
		var monCadre = document.getElementById("tableau");
		var coul_brd = document.getElementById("coul_brd").value;
		monCadre.style.border = tai_cadre+"px "+coul_brd+" solid";
	} else if (id_donner == "tai"){
		var tai = document.getElementById("tai").value;
		var mesCases = document.getElementsByClassName("td");
		for (let i = 0; i < mesCases.length; i++) {
			mesCases[i].style.width = tai+"px";
			mesCases[i].style.height = tai+"px";
		}


	}
}

function changer_couleur_bordure(){
	var donn_Cadre = document.getElementById("cadre").checked;
	var donn_Border = document.getElementById("border").checked;
	var coul_brd = document.getElementById("coul_brd").value;

	if (donn_Cadre == true){
		var tai_cadre = document.getElementById("tai_cadre").value;
		var monCadre = document.getElementById("tableau");
		monCadre.style.border = tai_cadre+"px "+coul_brd+" solid";
	}
	if (donn_Border == true){
		var tai_border = document.getElementById("tai_border").value;
		var mesCases = document.getElementsByClassName("td");
		for (let i = 0; i < mesCases.length; i++) {
			mesCases[i].style.border = tai_border+"px "+coul_brd+" solid";
		}
	}
	setTimeout('changer_couleur_bordure()',400);
}

function affiche_parametre(bool_para){
	div_tabl_para = document.getElementById("table_menu");
	if (bool_para == true){
		div_tabl_para.style.display = "table";
	}else {
		div_tabl_para.style.display = "none";
	}

}

function getStyle(a, b) {
	return window.getComputedStyle(b, null)[a];
}

function retour(){
	if (dico_retour.num_cas.length > 0){
		var nbr_de_modif = dico_retour.all_case_modif[dico_retour.all_case_modif.length - 1].length;
		for (i = 0; i < nbr_de_modif; i++){
			var ret_case = document.getElementById("case_"+dico_retour.all_case_modif[dico_retour.all_case_modif.length - 1][i]);
			ret_case.style.backgroundColor = dico_retour.pre_coul[dico_retour.pre_coul.length - 1][i];
		}

		dico_avance.taiSty.push(dico_retour.taiSty[dico_retour.taiSty.length - 1]);
		dico_avance.pre_coul.push(dico_retour.pre_coul[dico_retour.pre_coul.length - 1]);
		dico_avance.all_case_modif.push(dico_retour.all_case_modif[dico_retour.all_case_modif.length - 1]);
		dico_avance.coul.push(dico_retour.coul[dico_retour.coul.length - 1]);
		dico_avance.num_cas.push(dico_retour.num_cas[dico_retour.num_cas.length - 1]);
		dico_retour.taiSty.pop();
		dico_retour.pre_coul.pop();
		dico_retour.all_case_modif.pop();
		dico_retour.coul.pop();
		dico_retour.num_cas.pop();
	}
}

function retourner_dessin(orientation){
	var liste_couleur_rgb=[];
	for (i=0; i<(col*lig);i++){
		macoul = document.getElementById("case_"+i);
		liste_couleur_rgb.push(macoul.style.backgroundColor);
	}
	if (orientation=="vertical"){
		liste_col=[]
		for (i=0;i<lig;i++){
			liste_col.push(liste_couleur_rgb.slice(i*col,(i+1)*col));
		}
		liste_col.reverse();
		reconstruire_tableau(liste_col);
	} else if (orientation=="horizontal"){
		liste_col=[]
		for (i=0;i<lig;i++){
			liste_col.push(liste_couleur_rgb.slice(i*col,(i+1)*col));
		}
		for (x in liste_col){
			liste_col[x].reverse()
		}
		reconstruire_tableau(liste_col);

	}
}

function reconstruire_tableau(liste_coul, meta = ""){
	lig = liste_coul.length;
	col = liste_coul[0].length;
	tai = document.getElementById("tai").value;
	if (tai == 0 && tai == ""){
		tai = 20;
	}
	var tableau = document.getElementById("tableau");
	tableau.remove();

	var body = document.getElementById("place_tbl");
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	tbl.id = "tableau";
	for (var i = 0; i < lig; i++) {
		var row = document.createElement("tr");
		for (var j = 0; j < col; j++) {
			var cell = document.createElement("td");
			cell.style.width = tai+"px";
			cell.style.height = tai+"px";
			cell.className = "td";
			cell.style.backgroundColor = liste_coul[i][j];
			var cellText = document.createTextNode("");
			cell.setAttribute("onMouseOver","maintient_change("+(j+(i*col))+");");
			cell.setAttribute("onclick","dessiner("+(j+(i*col))+");");
			cell.id = "case_"+(j+(i*col));
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		tblBody.appendChild(row);
	}
	tbl.appendChild(tblBody);
	body.appendChild(tbl);
	var check_cadre = document.getElementById("cadre").checked;
	var check_border = document.getElementById("border").checked;

	persoCadre("cadre", check_cadre);
	persoCadre("border", check_border);
	change_donner('esp_cell');

	if (meta !== ""){
		if (meta[3]== "true"){
			meta[3]=true;
		}else {
			meta[3]=false;
		}
		if (meta[4]== "true"){
			meta[4]=true;
		}else {
			meta[4]=false;
		}

		document.getElementById("tai").value = meta[0];
		document.getElementById("esp_cell").value = meta[1];
		document.getElementById("coul_brd").value = meta[2];
		document.getElementById("tai_border").value = meta[5];
		document.getElementById("tai_cadre").value = meta[6];
		document.getElementById("border").checked = meta[3];
		document.getElementById("cadre").checked = meta[4];
		change_donner('tai');
		change_donner('esp_cell');
		change_donner('tai_border');
		change_donner('tai_cadre');
		persoCadre("border",meta[3]);
		persoCadre("cadre",meta[4]);
		diplay_Checkbox('border', 'div_bordure');
		diplay_Checkbox('cadre', 'div_cadre');

	}
	dico_retour = {"taiSty" : [], "num_cas" : [], "pre_coul" : [], "coul" : [], "all_case_modif" : []};
	dico_avance = {"taiSty" : [], "num_cas" : [], "pre_coul" : [], "coul" : [], "all_case_modif" : []};
}

function avance(){
	if (dico_avance.num_cas.length > 0){
		var nbr_de_modif = dico_avance.all_case_modif[dico_avance.all_case_modif.length - 1].length;
		for (i = 0; i < nbr_de_modif; i++){
			var ret_case = document.getElementById("case_"+dico_avance.all_case_modif[dico_avance.all_case_modif.length - 1][i]);
			ret_case.style.backgroundColor = dico_avance.coul[dico_avance.coul.length - 1];
		}

		dico_retour.taiSty.push(dico_avance.taiSty[dico_avance.taiSty.length - 1]);
		dico_retour.pre_coul.push(dico_avance.pre_coul[dico_avance.pre_coul.length - 1]);
		dico_retour.all_case_modif.push(dico_avance.all_case_modif[dico_avance.all_case_modif.length - 1]);
		dico_retour.coul.push(dico_avance.coul[dico_avance.coul.length - 1]);
		dico_retour.num_cas.push(dico_avance.num_cas[dico_avance.num_cas.length - 1]);
		dico_avance.taiSty.pop();
		dico_avance.pre_coul.pop();
		dico_avance.all_case_modif.pop();
		dico_avance.coul.pop();
		dico_avance.num_cas.pop();
	}

}

function dessin_jauge(element_div , taille , ratio , color , ombre , contexte){

	if(contexte===true){

		var circle = $('<canvas width="'+(taille*2)+'px" height="'+(taille*2)+'px" />');
		element_div.append(circle);
		// on configure notre plan de travail : 2 dimentions
		var ctx = circle[0].getContext('2d');

	}else{

		ctx = contexte;

	}

	// d�but du dessin
	ctx.beginPath();
	// on dessine un cercle
	ctx.arc(taille,taille,(taille/100*85), -1/2*Math.PI , ratio*2*Math.PI-1/2*Math.PI);
	// taille du bord
	ctx.lineWidth = (taille/100*20);
	//couleur du bord
	ctx.strokeStyle = color;

	if(ombre){

		//position de l'ombre
		ctx.shadowOffsetX = (taille/100*1.5);
		// taille de l'ombre
		ctx.shadowBlur = (taille/100*8);
		//couleur de l'ombre
		ctx.shadowColor='rgba(0,0,0,0.5)';

	}

	//fin du dessin
	ctx.stroke();

	return ctx;

}

function  change_outil(){
	opt = document.getElementById("select_outil").selectedIndex;
	afficher_outil();
}

function changer_couleur_palette(mon_id_span){
	var new_coul = document.getElementById(mon_id_span);
	new_coul = getStyle("background-color", new_coul);
	new_coul = new_coul.slice(4,-1);
	new_coul = new_coul.split(", ");
	var div_jauge_coul = document.getElementById("form_jauge");
	var div_conteneur = document.getElementById("div1");
	div_jauge_coul.remove();

	var form = document.createElement("form");
	form.id = "form_jauge"
	form.method = "post"

	var input_red = document.createElement("input");
	input_red.setAttribute("onclick", "charger();");
	input_red.setAttribute("data-min", "0");
	input_red.setAttribute("data-max", "255");
	input_red.setAttribute("data-color", "#ff0000");
	input_red.setAttribute("data-taille", "80");
	input_red.id ="rouge";
	input_red.type = "text";
	input_red.name = "compteur";
	input_red.className = "compteur";
	input_red.value =  new_coul[0];

	var input_blue = document.createElement("input");
	input_blue.setAttribute("onclick", "charger();");
	input_blue.setAttribute("data-min", "0");
	input_blue.setAttribute("data-max", "255");
	input_blue.setAttribute("data-color", "#0000FF");
	input_blue.setAttribute("data-taille", "80");
	input_blue.id ="bleu";
	input_blue.type = "text";
	input_blue.name = "compteur";
	input_blue.className = "compteur";
	input_blue.value =  new_coul[2];

	var input_green = document.createElement("input");
	input_green.setAttribute("onclick", "charger();");
	input_green.setAttribute("data-min", "0");
	input_green.setAttribute("data-max", "255");
	input_green.setAttribute("data-color", "#00FF00");
	input_green.setAttribute("data-taille", "80");
	input_green.id ="vert";
	input_green.type = "text";
	input_green.name = "compteur";
	input_green.className = "compteur";
	input_green.value =  new_coul[1];

	form.appendChild(input_red);
	form.appendChild(input_green);
	form.appendChild(input_blue	);
	div_conteneur.appendChild(form);

	create_jauge();
}

afficher_outil();
persoCadre();
generate_table();
changer_couleur_bordure();

function create_jauge() {
	(function($){

		// on entour le champs texte avec une Div qui contiendra notre jauge
		$('input.compteur').wrap('<div class="compteur" />').each(function(){

			// initialisation des variables
			var element_input = $(this); // le champs texte
			var element_div = element_input.parent(); // la div
			// on r�cup�re la valeur minimum de la jauge
			var min = element_input.data('min');
			// puis le maximum
			var max = element_input.data('max');
			//la couleur de la jauge
			var color = element_input.data('color') ? element_input.data('color') : "#91c2ff" ;
			// sa taille
			var taille = element_input.data('taille') ? element_input.data('taille') : 100 ;
			// on r�cup�re la valeur par d�faut de la jauge et la transporme en pourcentage
			var ratio = ( element_input.val() - min ) / ( max - min );

			// on met en forme la div et le champs texte
			element_div.width(taille*2)
				.height(taille*2);
			element_input.width(taille)
				.css("font-size",(taille/100*60)+"px")
				.css("top",(taille/100*60)+"px")
				.css("left",(taille/100*50)+"px");

			//on dessine la jauge circulaire � l'aide du canevas
			dessin_jauge(element_div , taille , 1 , "#fff" , true , true);

			//on dessine le niveau de la jauge circulaire
			var contexte = dessin_jauge(element_div , taille , ratio , color , false , true);

			// cr�ation d'un �v�nement : souris cliqu�e
			element_div.mousedown(function(event){

				// on supprimer tout �v�nement qui pourrai parasiter notre animation
				event.preventDefault();

				// cr�ation d'un �v�nement : souris en mouvement
				element_div.bind('mousemove' , function(event){

					// on r�cup�re la position de la souris
					var x = event.pageX - element_div.offset().left - element_div.width() / 2;
					var y = event.pageY - element_div.offset().top - element_div.height() / 2;

					// on calcule l'angle de la jauge de couleur
					var ratio = Math.atan2(x,-y) / (2*Math.PI);
					if(ratio<0){ ratio+=1;}

					//on efface l'ancienne jauge de couleur
					contexte.clearRect(0,0,(taille*2),(taille*2));

					//on redessine la jauge de couleur avec les nouvelles valeurs
					dessin_jauge(element_div , taille , ratio , color , false , contexte);

					// le champs texte obtient la nouvelle valeur arrondie
					element_input.val(Math.round( ratio * ( max - min ) + min ) );

				});

				// cr�ation d'un �v�nement : souris d�-cliqu�e
			}).mouseup(function(event){

				event.preventDefault();
				element_div.unbind('mousemove');

			});

		});

	})(jQuery);
}
function downloadFiles(file_name, file_type) {
	var liste_couleur_rgb=[];
	for (i=0; i<(col*lig);i++){
		macoul = document.getElementById("case_"+i);
		liste_couleur_rgb.push(macoul.style.backgroundColor);
	}
	var liste_col=[]
	for (i=0;i<lig;i++){
		liste_col.push(liste_couleur_rgb.slice(i*col,(i+1)*col));
	}
	if (file_type == "svg"){
		var data = '<?xml version="1.0" encoding="utf-8"?>' +
			'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">' +
			'<svg width="'+col*10+'px" height="'+lig*10+'px" xml:lang="fr" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
		for (i= 0; i<lig-1;i++){
			for (a=0;a<col-1;a++){
				data += '<rect x="'+a*10+'px" y="'+i*10+'px" width="10" height="10" style="fill:'+liste_col[i][a]+'"/>';
			}
		}
		data +=	"</svg>";
	} else {
		var taille_cell = document.getElementById("tai").value;
		var esp_cell = document.getElementById("esp_cell").value;
		var coul_brd = document.getElementById("coul_brd").value;
		var border = document.getElementById("border").checked;
		var cadre = document.getElementById("cadre").checked;
		var tai_border = document.getElementById("tai_border").value;
		var tai_cadre = document.getElementById("tai_cadre").value;
		var data = taille_cell+"$"+esp_cell+"$"+coul_brd+"$"+border+"$"+cadre+"$"+tai_border+"$"+tai_cadre+"!";
		for (x in liste_col){
			for (i in liste_col[x]){
				if (i == liste_col[x].length-1){
					data+= liste_col[x][i];
				}else {
					data+= liste_col[x][i] + ";";
				}
			}
			data+= "\n";
		}
	}
	var file = new Blob([data], {type: file_type});
	if (window.navigator.msSaveOrOpenBlob)
		window.navigator.msSaveOrOpenBlob(file, file_name);
	else {
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = file_name;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}
function init() {
	document.getElementById('ouvrir_input').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event) {
	const reader = new FileReader()
	reader.onload = handleFileLoad;
	reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
	data_open = event.target.result;
	my_data = loadFile(data_open);
	reconstruire_tableau(my_data.data,my_data.meta);

}
function loadFile(data){
	meta = data.split("!");
	data = meta[1];
	meta = meta[0];
	meta = meta.split("$")
	data = data.split("\n");
	for (i in data){
		data[i] = data[i].split(";");
	}
	data.pop();
	return { data, meta };
}
init();
create_jauge();
console.log("Créateur : Malo Mouron, Version : Baint Pro 2.0 ©, Soyez créatif");