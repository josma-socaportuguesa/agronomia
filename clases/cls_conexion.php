<?php 
   class cls_Conexion { 									//Declarar clase Abstracta Modelo
	private  $db_host 	= 'localhost';									//Nombre del Host
	private  $db_usuario 	= 'administrador';									//Nombre del Usuario
	private  $db_password = 'spsspbpainf10*';									//Password de la BD.
	private  $db_num_db	 ='';
	protected $db_nombre= 'socaDB';										//Nombre de la Base de Datos.
	private  $db_port="5432";		
	protected $query;													//Variable del Query
	protected $rows 			= array();								//Variable arreglo de las filas de una busqueda
	private $arCon;														//Variable de Conexion
	public $mensaje = 'Hecho';											//Mensaje de Hecho
	
	
/*-----------------------------------
* Funcion conectar (Conecta con la base de datos)
*-----------------------------------*/	   
	protected function propiedades($pcHost, $pcUsuario, $pcPassword, $pcNumdb){
		$this->db_host=$pcHost;
		$this->db_usuario=$pcUsuario;
		$this->db_password=$pcPassword;
		$this->db_num_db=$pcNumdb;
	}
/*-----------------------------------
* Funcion conectar (Conecta con la base de datos)
*-----------------------------------*/
   
	protected function f_Con() {
		$this->arCon = pg_connect("host=".$this->db_host." user=".$this->db_usuario." port=".$this->db_port." password=".$this->db_password." dbname=".$this->db_nombre);
	}
		
/*-----------------------------------
* Funcion Desconectar (Desconecta con la base de datos)
*-----------------------------------*/
   
	protected function f_Des(){
		pg_close($this->arCon);
	}
				
/*-----------------------------------
* Funcion Ejecutar (Ejecuta el Query que recibe)
*-----------------------------------*/
  
	protected function f_Ejecutar($lcSql){
		//print($lcSql);
		$result=pg_query($this->arCon,$lcSql) OR die ('Ejecucion Invalida');
		return $result;		
	}

/*-----------------------------------
* Funcion Filtro (Ejecuta las busquedas)
*-----------------------------------*/
  
	protected function f_Filtro($lcSql){
		//print($lcSql);
		$result=pg_query($this->arCon,$lcSql) OR die ('Ejecucion Invalida');
		return $result;		
	}
			
/*-----------------------------------
* Funcion Proximo (Recorre el proximo del resultado de un arreglo)
*-----------------------------------*/
  
	protected function f_Arreglo($result){
	   $arreglo=pg_fetch_array($result);
	   return $arreglo;
	}
	
/*-----------------------------------
* Funcion Cierrafiltro (Vacia el buffer obtenido de un arreglo)
*-----------------------------------*/
  	
	protected function f_Cierra($result){
		pg_free_result($result);
   }

/*-----------------------------------
* Funcion Begin 
*-----------------------------------*/
  	
	protected function f_Begin(){
		pg_query($this->arCon, "BEGIN WORK");
	}
	
/*-----------------------------------
* Funcion Commit 
*-----------------------------------*/
  		
	protected function f_Commit(){
		pg_query($this->arCon,"COMMIT");
	}
		
/*-----------------------------------
* Funcion Rollback 
*-----------------------------------*/
  	
	protected function f_RollBack(){
		pg_query($this->arCon,"ROLLBACK");
	}
				
/*-----------------------------------
* Funcion Fecha Real (Convierte una fecha 'Y/m/d' a formato normal 'd/m/Y')
*-----------------------------------*/
  		
	protected function fFechaBD($fecha){
		$now="now()";
		if(strlen($fecha)==10)
		{
			$dia=substr($fecha,8,2);
			$mes=substr($fecha,5,2);
			$ano=substr($fecha,0,4);
			$now=$dia."/".$mes."/".$ano;
		}
		return $now;
	}
	/******************** Funcion Registros   *************************************/
	/* esta funcion retorna cantidad de filas devueltas en un query			      */
	/******************************************************************************/
	/**/protected function f_Registro($prTb)									/**/
    /**/{																		/**/  
 	/**/    $li_Registros=pg_num_rows($prTb);									/**/
 	/**/    return $li_Registros;												/**/
    /**/}																		/**/
    /******************************************************************************/
}
	
/*---------------------------------------------
*	MODELO ELABORADO CON INSTRUCCIONES 
*	PARA UNA BASE DE DATOS EN POSTGRESQL
*----------------------------------------------*/		
?>
