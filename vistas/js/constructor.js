/*---------------------MEDIA QUERY CHANGES-----------------------------------*/
var handleMediaChange = function (mediaQueryList) {
    if(constructor.estado=='inicializado'){
    	var formulario = constructor.elementos.formulario;
	    if (mediaQueryList.matches) {
	    	//cambio interfaz Ventana Form
	        formulario.ventanaForm.nodo.style.width=(formulario.ventanaForm)?'calc(85%)':null;
	        formulario.ventanaForm.nodo.style.marginLeft=(formulario.ventanaForm)?'50px':null;
	    }
	    else {
	    	//cambio interfaz Ventana Form
	        formulario.ventanaForm.nodo.style.width=(formulario.ventanaForm)?'600px':null;
	        formulario.ventanaForm.nodo.style.marginLeft=(formulario.ventanaForm)?'30px':null;
	    }
	}
}

var mql = window.matchMedia("(max-width: 1000px)");
mql.addListener(handleMediaChange);
handleMediaChange(mql);

/*-------------------------Objeto Botonera ----------------------------------------*/
var Botonera = function(estructura){
	
	var Boton = function(tipo){
		this.tipo = tipo.toLowerCase();
		this.nodo;
		this.estado = 'porConstruir';

		this.construirNodo = function(){
			var nodo = document.createElement('button');
			nodo.setAttribute('type','button');
			switch(this.tipo){
				case 'abrir':
					nodo.setAttribute('btnAbrir','');
					nodo.setAttribute('estado','oculto');
				break;
				case 'nuevo':
					nodo.setAttribute('btnNuevo','');
				break;
				case 'buscar':
					nodo.setAttribute('btnBuscar','');
				break;
				case 'modificar':
					nodo.setAttribute('btnModificar','');
				break;
				case 'eliminar':
					nodo.setAttribute('btnEliminar','');
				break;
				case 'listar':
					nodo.setAttribute('btnListar','');
				break;
				case 'redactar':
					nodo.setAttribute('btnRedactar','');
				break;
				case 'guardar':
					nodo.setAttribute('btnGuardar','');
					nodo.onclick=guardar;
				break;
			}
			this.nodo = nodo;
			this.estado = 'enUso';
		}
		this.construirNodo();
	}

	this.estructura = estructura;
	this.estado = 'porConstruir';
	this.nodo;

	this.botones = new Array(); 
	this.construir = function(){
		var contenedor = obtenerContenedor();
		var nodo = document.createElement('div');
		nodo.setAttribute('botonera','');
		contenedor.parentNode.insertBefore(nodo,contenedor.nextSibling);
		this.nodo = nodo;
		this.inicializarBotones();
	}
	this.inicializarBotones = function(){
		var botones = this.estructura;
		for(var x = 0; x < botones.length; x++){
			this.agregarBoton(botones[x]);
		}
		this.agregarEfectos();
	}
	this.agregarBoton = function(tipo){
		var botonera = this.nodo;
		var existe = false;
		for(var x=0;x<this.botones.length;x++){
			if(this.botones[x].tipo==tipo.toLowerCase()){
				existe=true;
				console.log('el boton '+tipo+' ya existe');
			}
		}
		if(!existe){

			var boton = new Boton(tipo);
			botonera.appendChild(boton.nodo);
			//esta parte es solo para cuando se agrega un boton en un momento posterior a la inicializacion
			if(this.buscarBoton('abrir')!=-1){
				if(this.buscarBoton('abrir').nodo.getAttribute('estado')=='visible'){
					setTimeout(function(){
						var top=this.botones.length*45;
						boton.nodo.style.top='-'+top+'px';
					},10);
				}
			}
			this.botones.push(boton);
		}
	}
	this.agregarEfectos = function(){
		var botones = this.botones;
		if(botones.length>1){
			if(!this.buscarBoton('abrir')){
				console.log('no se encuentra el boton de apertura')
			}else{
				this.buscarBoton('abrir').nodo.onclick = function(){
					if(this.getAttribute('estado')=='oculto'){
						var top = 0;
						this.classList.toggle('apertura');
						this.setAttribute('estado','visible');
						for(var x = 0; x < botones.length; x++){
							if(botones[x].tipo!='abrir'){
								top+=45;
								botones[x].nodo.style.top = '-'+top+'px';
							}
						}
					}else{
						this.classList.toggle('apertura');
						this.setAttribute('estado','oculto');
						for(var x = 0; x < botones.length; x++){
							if(botones[x].tipo!='abrir'){
								botones[x].nodo.style.top = 0+'px';
							}
						}
					}
				}
			}	
		}	
	}
	this.buscarBoton = function(tipo){
		var botones = this.botones;
		for(var x = 0; x < botones.length; x++){
			if(botones[x].tipo==tipo){
				return botones[x];
			}
		}
		return -1;
	}
	this.listarBotones = function(){
		var lista = this.botones;
		var resultado = 'estos son los botones agregados:\n';
		for( var x = 0; x < lista.length; x++){
			resultado += '\t'+lista[x].tipo+'\n';
		}
		console.log(resultado);
	}
	this.getEstado = function(){
		console.log(this.estado);
	}
	this.quitarBoton = function(tipo){
		var eliminar=this.buscarBoton(tipo);
		if(eliminar!=-1){
			eliminar.nodo.style.top='0px';
			setTimeout(function(){
				eliminar.nodo.parentNode.removeChild(eliminar.nodo);
			},510);
			this.botones.splice(this.botones.indexOf(eliminar),1);
		};
		
	}
	this.construir();
}
/*-------------------------Objeto Menu ----------------------------------------*/
var Menu = function(){

	var elemento = function(tipo,contenido,enlace){
		enlace = enlace || '#';
		this.id = '';
		this.estado = 'porConstriur';
		this.contenido = contenido;
		this.nodo;
		this.tipo = tipo;
		this.enlace = enlace;

		this.construirNodo = function(){
			var nodo = document.createElement('section');
			nodo.innerHTML = contenido;
			if(this.tipo=='titulo'){
				nodo.setAttribute('titulo','');
			}
			if(this.enlace!='#'){
				nodo.setAttribute('enlace',this.enlace);
				nodo.onclick=function(){
					location.href=this.getAttribute('enlace');
				}
			}
			this.nodo = nodo;
		}
		this.agregarId = function(id){
			this.nodo.setAttribute('elemId',id);
			this.id = id;
		}
		this.construirNodo();

	}
	this.estado = 'porConstriur';
	this.componentes = new Array();
	//nodo de DOM
	this.nodo;
	//contador de elementos agregados
	this.contE=0;

	this.construir = function(){
		var contenedor = obtenerContenedor();
		var nodo = document.createElement('div');
		nodo.setAttribute('capaMenu','');
		nodo.setAttribute('estado','oculto');
		nodo.id = 'menu';
		contenedor.insertBefore(nodo,contenedor.firstChild);
		this.nodo = nodo;
		this.estado='enUso';
	}
	this.buscarCompornentesPorTexto = function(texto){
		var lista = this.componentes;
		var resultado = new Array();
		for(var x = 0;x < lista.length; x++){
			if(lista[x].textContent==texto){
				resultado.push(lista[x]);
			}
		}
		return resultado;
	}
	this.buscarComponente = function(idNum){
		var lista = this.componentes;
		for(var x = 0;x < lista.length; x++){
			if(lista[x].id=='menuElem'+idNum){
				return lista[x];
			}
		}
		return -1;
	}
	this.agregarComponente = function(tipo,contenido,enlace){
		var menu = this.nodo;
		var nuevoComponente = new elemento(tipo,contenido,enlace);
		nuevoComponente.agregarId('menuElem'+this.contE);
		this.contE++;
		this.componentes.push(nuevoComponente);
		menu.appendChild(nuevoComponente.nodo);
	}
	this.removerComponente = function(idNum){
		var componente = this.buscarComponente(idNum);
		if(componente==-1){
			console.log('componente '+idNum+' no existe');
		}else{
			componente.nodo.parentNode.removeChild(componente.nodo);
			this.componentes.splice(this.componentes.indexOf(componente),1);
		}
	}
	this.listarComponentes = function(){
		var lista = this.componentes;
		var resultado = 'los elementos presentes son:\n';
		for(var x = 0;x < lista.length; x++){
			resultado += '\t'+lista[x].id+'\n';
		}
		console.log(resultado);
	}
	this.getEstado = function(){
		return this.estado;
	}
	this.abrirMenu = function(){
		var btnMenu = document.getElementById('menuBtn');
		btnMenu.click();
	}
	this.construir();
}
/*-------------------------Objeto Cabecera ----------------------------------------*/
var Cabecera = function(){

	this.estado = 'porConstriur';

	this.construir = function(){
		var contenedor = obtenerContenedor();
		var elemento = document.createElement('div');
		elemento.setAttribute('cabecera','');
		elemento.innerHTML = "<button type='button' menuBtn id='menuBtn'></button><div titulo>SOCA-PORTUGUESA</div>"; 
		contenedor.insertBefore(elemento,contenedor.firstChild);
		//funcionamiento boton
		var botonMenu=document.getElementById('menuBtn');
		botonMenu.onclick=function(){
			var menu = document.getElementById('menu');
			if(menu.getAttribute('estado')=='visible'){
				menu.style.marginLeft='-250px';
				menu.setAttribute('estado','oculto');
			}else if(menu.getAttribute('estado')=='oculto'){
				menu.style.marginLeft='0px';
				menu.setAttribute('estado','visible');
			}
		}
		this.estado='enUso';
	}
	this.construir();
}
/*------------------------------Objeto Formulario(lista)-----------------*/
var Formulario = function(){

	/*------------------------------Objeto VentanaForm------------*/
	var VentanaForm = function(){

		this.tipo = 'noPosee';

		this.nodo;

		this.estado = 'sinConstruir';

		//este es usado cuando se va a editar un registro en especifico
		this.registroId='';

		this.construirNodo = function(data){
			var nodo = document.createElement('div');
			nodo.setAttribute('capaForm','');
			nodo.id='VentanaForm';
			var html='';
			this.tipo=data.tipo;
			if(this.tipo=='nuevo'){
				this.registroId='';
				html+='\
				<section titulo>Nuevo Rol</section>\
					<section sector>\
						<form name ="formNuevo">\
							<div class="group">\
						      <input type="text" name="Nombre" required>\
						      <span class="highlight"></span>\
						      <span class="bar"></span>\
						      <label>Nombre</label>\
						    </div>\
						    <div class="group">\
						      <input type="text" name="Descripcion" required>\
						      <span class="highlight"></span>\
						      <span class="bar"></span>\
						      <label>Descripcion</label>\
						    </div>\
						</form>\
					</section>\
				</section>';
				nodo.innerHTML=html;
				constructor.elementos.botonera.agregarBoton('guardar');
				this.nodo=nodo;
			}else if(this.tipo='modificar'){
				this.registroId=data.id;
				constructor.elementos.botonera.quitarBoton('guardar');
				html+='\
					<section titulo><textarea  name="nombre"></textarea><span>'+data.nombre+'</span><article update="campo"></article></section>\
						<section sector>\
							<div><textarea name="descripcion"></textarea><span >'+data.descripcion+'</span><article update="area"></article></div>\
						</section>\
						<section sector>\
							<div>Privilegios</div>\
							<section contenedor id="contenedorPri">\
							</section>\
						</section>\
					</section>';
			nodo.innerHTML=html;
			normalizarNodo(nodo);
			var contenedor=nodo.childNodes[2];
			this.nodo=nodo;
			//arreglo temporal de privilegios
				dataTemp=buscarPrivilegios(data.id);
				this.agregarElementos(contenedor,dataTemp);
			}
		}
		this.reconstruirInterfaz=function(data){
			var html='';
			if(data.tipo=='nuevo'){
				this.registroId='';
				constructor.elementos.formulario.controlLista();
				this.nodo.style.height='0px';		
				setTimeout(function(){
					var nodo=constructor.elementos.formulario.ventanaForm.nodo;
					nodo.style.height='250px';
					html+='\
				<section titulo>Nuevo Rol</section>\
					<section sector>\
						<form name ="formNuevo">\
							<div class="group">\
						      <input type="text" name="Nombre" required>\
						      <span class="highlight"></span>\
						      <span class="bar"></span>\
						      <label>Nombre</label>\
						    </div>\
						    <div class="group">\
						      <input type="text" name="Descripcion" required>\
						      <span class="highlight"></span>\
						      <span class="bar"></span>\
						      <label>Descripcion</label>\
						    </div>\
						</form>\
					</section>\
				</section>';
					nodo.innerHTML=html;
				},600);
				constructor.elementos.botonera.agregarBoton('guardar');
			}else if(data.tipo='modificar'){
				this.registroId=data.id;
				constructor.elementos.botonera.quitarBoton('guardar');
				this.nodo.style.height='0px';		
				setTimeout(function(){
					var nodo=constructor.elementos.formulario.ventanaForm.nodo;
					nodo.style.height='250px';
					nodo.style.borderRadius='0px';
						html+='\
					<section titulo><textarea  name="nombre"></textarea><span>'+data.nombre+'</span><article update="campo"></article></section>\
						<section sector>\
							<div><textarea name="descripcion"></textarea><span >'+data.descripcion+'</span><article update="area"></article></div>\
						</section>\
						<section sector>\
							<div>Privilegios</div>\
							<section contenedor id="contenedorPri">\
							</section>\
						</section>\
					</section>';
					nodo.innerHTML=html;
					normalizarNodo(nodo);
					var contenedor=nodo.childNodes[2];
					//arreglo temporal de privilegios
						dataTemp=buscarPrivilegios(data.id);
						constructor.elementos.formulario.ventanaForm.agregarElementos(contenedor,dataTemp);
				},600);
			}
		}
		this.destruirNodo = function(){
			if(this.registroId!=''){
				this.registroId='';
				constructor.elementos.formulario.controlLista();
			}
			this.nodo.style.height='0px';
			setTimeout(function(){
				var vf=constructor.elementos.formulario.ventanaForm;
				vf.nodo.parentNode.removeChild(vf.nodo);
				vf.estado='sinConstruir';
			},510);
		}
		this.agregarElementos=function(contenedor,elementos){
			var html="";
			for(var x=0;x<elementos.length;x++){
				html+="<article>"+elementos[x].nombre+"</article>";
			}
			html+='<article add="privilegio"></article>';
			contenedor.innerHTML=html;
			this.agregarFuncionamiento();
		}
		this.agregarFuncionamiento = function(){
			var nodo=this.nodo;
			var lista=nodo.getElementsByTagName('article');
			for(var x=0;x<lista.length;x++){
				if(lista[x].getAttribute('update')!==null){
					lista[x].onclick=this.edicion;
				}else if(lista[x].getAttribute('add')!==null){
					lista[x].onclick=function(){
						console.log('agregar');
						var registro = buscarRegistro(constructor.elementos.formulario.ventanaForm.registroId);
						var dataTemp = {
							cabecera:'Agregar Privilegio',
							cuerpo:'<label>'+registro.nombre+'</label><select></select>',
							pie:'<section modalButtons><button type="button" cancelar></button><button type="button" aceptar></button></section>'
						}
						constructor.elementos.modalWindow=new modalWindow();
						constructor.elementos.modalWindow.arranque(dataTemp);
					}
				}
			}
		}
		this.edicion=function(){
			var nodo=this;
			var campo=this.previousSibling;
			var campoEdicion=campo.previousSibling;
			campoEdicion.value=campo.textContent;
			campoEdicion.style.display='inline-block';

			campo.style.width=window.getComputedStyle(campo,null).getPropertyValue("width");
			campo.style.maxHeight=window.getComputedStyle(campo,null).getPropertyValue("height");
			nodo.classList.toggle('edicion');

			setTimeout(function(){
				campo.style.width='0px';
				campo.style.opacity='0';

				campoEdicion.style.width='calc(100% - 62px)';
				campoEdicion.style.padding='5px';
				campoEdicion.style.opacity='1';
				if(nodo.getAttribute('update')=='campo'){
					campoEdicion.style.height="20px";
				}else if(nodo.getAttribute('update')=='area'){
					campoEdicion.style.height="40px";
				}
			},10);
			setTimeout(function(){
				nodo.onclick=constructor.elementos.formulario.ventanaForm.finEdicion;
				if(nodo.getAttribute('update')=='area'){
					campoEdicion.style.height="150px";
					campoEdicion.style.padding="15px";
				}
			},520);
			setTimeout(function(){
				campoEdicion.focus();
			},1010);

		}
		this.finEdicion = function(){
			var nodo=this;
			var campo=this.previousSibling;
			var campoEdicion=campo.previousSibling;

			var id=constructor.elementos.formulario.ventanaForm.registroId;
			var nombreCampo=campoEdicion.name;
			var valorCampo=campoEdicion.value;

			console.log('se disparo una edicion con id:'+constructor.elementos.formulario.ventanaForm.registroId+' en campo:'+campoEdicion.name);
			var registro=editarCampo(id,nombreCampo,valorCampo);
			constructor.elementos.formulario.actualizarLista(registro);

			campo.textContent=campoEdicion.value;
			
			nodo.classList.toggle('edicion');
			campo.style.width='calc(100% - 62px)';
			campo.style.opacity='1';

			campoEdicion.style.width='0px';
			campoEdicion.style.opacity='0';
			campoEdicion.style.height='0px';
			setTimeout(function(){
				campoEdicion.style.width='auto';
				campoEdicion.style.display='none';
				nodo.onclick=constructor.elementos.formulario.ventanaForm.edicion;
				campoEdicion.style.width=window.getComputedStyle(campoEdicion,null).getPropertyValue("width");
				campo.style.width=campoEdicion.style.width;
				campoEdicion.style.width='0px';
				campoEdicion.value='';
			},510)
		}	

	}
	/*------------------------------Objeto VentanaForm------------*/
	/*------------------------------Objeto Slot-------------------*/
	var Slot = function(data){

		this.atributos = data;

		this.estado = 'sinInicializar';

		this.rol = 'lista';

		this.nodo;

		this.construirNodo = function(nombre){
			var nodo = document.createElement('section');
			nodo.setAttribute('slot','');
			nodo.id=this.atributos.id;
			var html ="";
			html+="<article  title>"+this.atributos.nombre+"</article>\
				<button type='button' btnEliminar></button>";
			nodo.innerHTML=html;
			this.nodo = nodo;
			this.estado='enUso';
			this.funcionamiento();
		}
		this.funcionamiento = function(){
			var nodo = this.nodo;
			var article =nodo.getElementsByTagName('article')[0];
			article.onclick=function(){
				var formulario = constructor.elementos.formulario;
				formulario.controlLista(this.parentNode);
				var newSelec = formulario.obtenerSeleccionado();
				var data = {
						tipo:'modificar',
						nombre:newSelec.atributos.nombre,
						descripcion:newSelec.atributos.descripcion,
						id:newSelec.atributos.id
					}
				formulario.construirInterfaz(data);
			}
		}
		this.reconstruirNodo = function(){
			this.nodo.style.marginLeft="120%";
			var nodo=this.nodo;
			var slot=this;
			var html="<article  title>"+this.atributos.nombre+"</article>\
			<button type='button' btnEliminar></button>";
			setTimeout(function(){
				nodo.innerHTML=html;
				slot.funcionamiento();
				console.log(slot.estado);
				constructor.elementos.formulario.controlLista(nodo);
			},510);
			
		}
		this.construirNodo();
	}
	/*--------------------------Fin Objeto Slot-------------------*/
	this.Slots = new Array();

	this.ventanaForm = new VentanaForm();

	this.estado = 'sinInicializar';

	this.nodo;

	this.listarSlots = function(){
		console.log('Slots:');
		for(var x=0;x<this.Slots.length;x++){
			console.log('nombre: '+this.Slots[x].atributos.nombre+'\testado: '+this.Slots[x].estado);
		}
	}
	this.obtenerSeleccionado = function(){
		var seleccionado=false;
		for(var x=0;x<this.Slots.length;x++){
			if(this.Slots[x].estado=='seleccionado'){
				seleccionado=this.Slots[x];
			}
		}
		return seleccionado;
	}
	this.construir = function(){
		var contenedor = obtenerContenedor();
		var elemento = document.createElement('div');
		elemento.setAttribute('capaList','');
		var html='';
		html+="<section busqueda>\
					<input type='text' placeHolder='Buscar...'campBusq>\
					<button type='button' btnBusq></button>\
				</section>"
		elemento.innerHTML = html;
		this.nodo=elemento;
		contenedor.insertBefore(elemento,document.getElementById('menu').nextSibling);
		this.estado='enUso';
	}
	this.agregarSlot = function(data){
		var slot = new Slot(data);
		this.Slots.push(slot);
		this.nodo.appendChild(slot.nodo);
		return slot.nodo;
	}
	this.cargarRegistros = function(registros){
		for(var x=0; x<registros.length;x++){
			this.agregarSlot(registros[x]);
		}
	}
	this.construirVentanaForm=function(tipo){
		this.ventanaForm.construirNodo(tipo);
	}
	this.controlLista = function(nodo){
		var obj=false;
		var oldSelecinado=this.obtenerSeleccionado();
		for(var x=0;x<this.Slots.length;x++){
			if(this.Slots[x].nodo==nodo){
				this.Slots[x].estado='seleccionado';
				this.Slots[x].nodo.style.marginLeft='20px';
				obj=this.Slots[x];
			}else{	
				this.Slots[x].estado='enUso'
				this.Slots[x].nodo.style.marginLeft='0px';	
			}
		}
	}
	this.agregarVentanaForm = function(){
		this.ventanaForm.estado='agregado';
		this.nodo.parentNode.insertBefore(this.ventanaForm.nodo,this.nodo.nextSibling);
		setTimeout(function(){
			constructor.elementos.formulario.ventanaForm.nodo.style.height='250px';
		},10);	
		
	}
	this.construirInterfaz = function(data){
		var existeVentana=(this.ventanaForm.estado=='agregado')?true:false;
		if(existeVentana){
			this.ventanaForm.reconstruirInterfaz(data)
		}else{
			this.construirVentanaForm(data);
			this.agregarVentanaForm();
		}
	}
	this.actualizarLista = function(cambios){
		if(cambios instanceof Array){

		}else{
			this.actualizarSlot(cambios);
		}
	}
	this.actualizarSlot = function(registro){
		this.buscarSlot(registro);
	}
	this.buscarSlot = function(registro){
		for(x=0;x<this.Slots.length;x++){
			if(this.Slots[x].atributos.id==registro.id){
				this.Slots[x].atributos=registro;
				this.Slots[x].reconstruirNodo();
			}
		}
	}
	this.construir();
}
/*------------------------------Objeto Ventana Modal-----------------------*/
var modalWindow = function(){

	var capaContenido = function(){

		var Cabecera = function(){

			this.estado='sinConstruir';
			this.nodo;

			this.construirNodo = function(){
				var nodo=document.createElement('section');
				nodo.setAttribute('cabecera','');
				this.nodo=nodo;
			}
			this.construirNodo()
		}

		var Cuerpo = function(){
			this.estado='sinConstruir';
			this.nodo;

			this.construirNodo = function(){
				var nodo=document.createElement('section');
				nodo.setAttribute('cuerpo','');
				this.nodo=nodo;
			}
			this.construirNodo()
		}

		var Pie = function(){
			this.estado='sinConstruir';
			this.nodo;

			this.construirNodo = function(){
				var nodo=document.createElement('section');
				nodo.setAttribute('pie','');
				this.nodo=nodo;
			}
			this.construirNodo()
		}

		this.estado='sinConstruir';
		this.partes={};
		this.nodo;
		this.tipo='contenido';

		this.construirNodo = function(){
			var nodo=document.createElement('div');
			var predecesor = constructor.elementos.modalWindow.obtenerUltimaCapa();
			nodo.setAttribute('capa','contenido');
			predecesor.nodo.parentNode.insertBefore(nodo,predecesor.nodo.nextSibling);
			this.nodo=nodo;
			this.agregarParte('cabecera');
			this.agregarParte('cuerpo');
			this.agregarParte('pie');
			this.estado='enUso';
			setTimeout(function(){
				nodo.style.top=' calc(50% - 250px)';
				nodo.style.opacity='1';
			},300);
		}

		this.agregarParte = function(parte){
			switch(parte){
				case 'cabecera':
					this.partes.cabecera=new Cabecera();
					this.nodo.appendChild(this.partes.cabecera.nodo);
				break
				case 'cuerpo':
					this.partes.cuerpo=new Cuerpo();
					this.nodo.appendChild(this.partes.cuerpo.nodo);
				break
				case 'pie':
					this.partes.pie=new Pie();
					this.nodo.appendChild(this.partes.pie.nodo);
				break
			}
		}

		this.dibujarInterfaz = function(data){
			this.partes.cabecera.nodo.textContent=data.cabecera;
			this.partes.cuerpo.nodo.innerHTML=data.cuerpo;
			this.partes.pie.nodo.innerHTML=data.pie;
		}
		this.construirNodo();
	}

	var capaExterior = function(){

		this.estado='sinConstruir';
		this.nodo;
		this.tipo='exterior';

		this.construirNodo = function(){
			var nodo = document.createElement('div');
			nodo.setAttribute('capa','exterior');
			document.body.appendChild(nodo);
			this.nodo=nodo;
			this.estado='enUso';
			setTimeout(function(){
				nodo.style.opacity='0.8';
			},10);
			
		}
		this.construirNodo();
	}

	this.estado='sinConstruir';
	this.capas=new Array();

	this.arranque = function(data){
		console.log('arranco modalWindow');
		this.agregarCapa('exterior');
		var contenido=this.agregarCapa('contenido');
		contenido.dibujarInterfaz(data);
		this.manejoDeCapas();
	}
	this.agregarCapa = function(tipo){
		var capaNueva=false;;
		if(tipo=='exterior'){
			capaNueva=new capaExterior();
			this.capas.push(capaNueva);
		}else if(tipo=='contenido'){
			if(this.existeExterior()){
				capaNueva=new capaContenido();
				this.capas.push(capaNueva);
			}
		}
		return capaNueva;
	}
	this.removerCapa = function(){
		var capaExterior=constructor.elementos.modalWindow.buscarCapa(this);
		if(capaExterior){
			var capaContenido= constructor.elementos.modalWindow.buscarCapa(capaExterior.nodo.nextSibling);
			//los saco de vista con la tansicion
			//capa contenido
			capaContenido.nodo.style.top='200%';
			capaContenido.nodo.style.opacity='0';
			setTimeout(function(){
				capaExterior.nodo.style.opacity='0';
			},300);
			setTimeout(function(){
				capaContenido.nodo.parentNode.removeChild(capaContenido.nodo);
				capaExterior.nodo.parentNode.removeChild(capaExterior.nodo);
				obtenerContenedor().style.position='inherit';
			},810);
		}
	}
	this.buscarCapa = function(nodo){
		var capa=false;
		for(var x=0;x<this.capas.length;x++){
			if(this.capas[x].nodo==nodo){
				capa=this.capas[x];
				break
			}
		}
		return capa;
	}
	this.existeExterior = function(){
		var capas=this.capas;
		var existe = false;
		for(var x=0;x<capas.length;x++){
			if(capas[x].tipo=='exterior'){
				existe=true;
				break
			}
		}
		return existe;
	}
	this.obtenerUltimaCapa = function(){
		var ultimaCapa = this.capas[this.capas.length-1];
		return ultimaCapa;
	}
	this.manejoDeCapas = function(){
		var contenedor=obtenerContenedor();
		if(this.existeExterior()){
			contenedor.style.position='fixed';
			for(var x=0;x<this.capas.length;x++){
				if(this.capas[x].nodo.getAttribute('capa')=='exterior'){
					console.log('encontro una exterior');
					this.capas[x].nodo.onclick=this.removerCapa;
				}
			}
		}else{
			contenedor.style.position='inherit';	
		}
	}
}
/*------------------------------Objeto Constructor-----------------------*/
var Constructor = function(){

	this.elementos = new Array();

	this.estado = 'sinInicializar';

	this.configure = function(){

		this.elementos = {

			 menu : new Menu(),
			 cabecera : new Cabecera(),
			 formulario : 'noPosee',
			 botonera : 'noPosee'
		}
		this.estado='inicializado';
	}
}
/*---------------Utilidades---------------------------------------------*/
function obtenerContenedor(){
	var contenedor = document.body.firstChild;
	while(contenedor.nodeName=='#text'){
		contenedor=contenedor.nextSibling;
	}
	return contenedor;
}
function normalizarNodo(nodo){
	var hijo=null;
	var eliminar;
	while(hijo!=nodo.lastChild){
		if(hijo==null){
			hijo=nodo.firstChild;
		}
		if(hijo.nodeName=='#text'){
			eliminar=hijo;
			hijo=hijo.nextSibling;
			eliminar.parentNode.removeChild(eliminar);
		}else{
			hijo=hijo.nextSibling;
		}
	}
}