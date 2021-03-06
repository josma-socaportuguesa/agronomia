//borrar
	var contId=4;
	var roles = [
						{
							nombre:'cuentasxpagar',
							id:1,
							descripcion:'cuentasxpagar',
							detalle:[
									{id:'3',nombre:'ProbioAgro'},{id:'2',nombre:'SocaPortuguesa'}
								]
						},
						{
							nombre:'administrador',
							id:2,
							descripcion:'este rol esta encargado de supervisar lo que ocurre dentro del sistema con opcion a ver la mayoria de los modulos ademas de asegurar el correcto funcionamiento del mismo',
							detalle:[
									{id:'3',nombre:'ProbioAgro'},{id:'2',nombre:'SocaPortuguesa'},{id:'1',nombre:'SocaServicios'}
								]
						},
						{
							nombre:'almacen-facturacion',
							id:3,
							descripcion:'factura en almacen',
							detalle:[
									{id:'2',nombre:'SocaPortuguesa'}
								]
						}
					];
	var empresas = [
		{	
			id:'1',
			nombre:'SocaServicios'
		},{
			id:'2',
			nombre:'ProbioAgro'
		},{
			id:'3',
			nombre:'SocaPortuguesa'
		},{
			id:'4',
			nombre:'E/S Piedritas Blancas'
		}
	]
var Motor = function(entidadActiva){
	
	this.estado='apagado';
	//entidad activa es decir la entidad que inicio el motor o la que esta en uso en el momento
	this.entidadActiva=entidadActiva;
	//todos los registros que tiene la entidad activa entidad activa 
	this.registrosEntAct = new Array();

	this.ignition = function(){
		this.registrosEntAct = this.buscarRegistros(this.entidadActiva);
	} 
	this.buscarRegistro = function(id,entidad){
		var registro=false;
		var registros;
		//si la entidad a la cual se va a buscar es la misma que esta activa en el motor se utiliza el arreglo temporal
		if(entidad=this.entidadActiva){
			registros = this.registrosEntAct;
		} 
		//en caso contraria se dispara la busqueda
		else 
		{
			registros = this.buscarRegistros(entidad);
		}
		
		for(var x=0;x<registros.length;x++){
			if(registros[x].id==id){
				registro=registros[x];
			}
		}
		return registro;
	}

	this.buscarDetalle = function(idPadre,entidadPadre){
		console.log('se disparo una busueda de '+entidadPadre+' con id:'+idPadre);
		var registroPadre = this.buscarRegistro(idPadre,entidadPadre);
		var data = new Array();
		for(var y=0;y<registroPadre.detalle.length;y++){
			data.push(registroPadre.detalle[y]);
		}
		return data;
	}
	//busqueda en bd
	this.buscarRegistros =function(entidad){
		if(entidad=='empresa'){
			return empresas;
		}else if(entidad=='rol'){
			return roles;
		}
	}
	//--------------------------------------------funciones guardado--------------------------------
	this.guardar = function(nuevoRegistro,entidad){
		if(entidad=='empresa'){
			empresas.push(nuevoRegistro);
		}else if(entidad=='rol'){
			roles.push(nuevoRegistro);
		}
		if(this.entidadActiva==entidad){
			this.registrosEntAct = this.buscarRegistros(entidad);
		}
	}
	this.editarCampo= function(id,campo,valor){
		var registro=torque.buscarRegistro(id);
		registro[campo]=valor;
		return registro;
	}
	this.guardarEnDetalle= function(id,cambios){
		var registro=this.buscarRegistro(id)
		for(var x=0;x<cambios.length;x++){
			registro.detalle.push(cambios[x]);
		}
		return registro;
	}
	//funcion de arranque 
	this.ignition();
}
	