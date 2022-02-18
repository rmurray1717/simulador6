<template>
<div class="container table-1">

<br><br>

<!--nav del titulo-->
<div class="row">
  <div class="col-sm-4"><img class="img" src="/assets/logo.png"/></div>
  <div class="col-sm-8"><br><br><h2 class="text-center" style="border-radius: 4px; box-shadow: 5px 3px 10px 0;"><b>Simulador de Crédito</b></h2></div>
</div>

<br><br>

<!--parte del primer formulario-->
<div class="container px-1">
  	<div class="row gx-4">
    	<div class="col">
     		<div class="p-3">
		 		<div class="row">					 				 
				<hr size="4px"/>				 
					<div class="col-4">		
						<label for="" title="Monto a solicitar">Monto del Crédito:</label>
					</div>
					<div class="col-4">
						<!--<input v-model.number="Monto" type="number">-->
						<v-currency-input v-model="Monto" ref="monto"/>
					</div>

					<div class="col-4">MXN</div>

					<div class="col-4"><br>
						<label for="" title="Meses para pagar el crédito">Plazo del Crédito:</label>
					</div>

					<div class="col-8"><br>
						<select v-model="Plazo" @change="Gracia=0">
							<option :value="6">6 meses</option>
							<option :value="12">12 meses</option>
							<option :value="18">18 meses</option>
							<option :value="24">24 meses</option>
							<option :value="36">36 meses</option>
							<option :value="48">48 meses</option>
							<option :value="60">60 meses</option>	
						</select>
						Meses
					</div>
					<div class="col-4"><br>
						<label for="" title="Costo que deberá pagar por el uso de ese dinero">Tasa de Interés Anual:</label>
					</div>
					<div class="col-4"><br>
						<v-currency-input v-model="Tasa" :decimals="4"/>
					<!--<input v-model="Tasa" type="number">%
						 <option :value="0.17">17.0000%</option>
						<option :value="0.18">18.0000%</option>
						<option :value="0.19">19.0000%</option>
						<option :value="0.20">20.0000%</option>
						<option :value="0.21">21.0000%</option>
						<option :value="0.22">22.0000%</option>	
					</select> -->
					</div>
					<div class="col-4"><br>%</div>

					<div class="col-4"><br>
						<label for="" title="Período durante el cual el deudor no realizará pagos al capital del crédito">Aplazar el Crédito:</label>
					</div>
					<div class="col-8"><br>
						<select v-model="Gracia">
							<option :value="3" >3 meses</option>
							<option :value="6" v-if="Plazo>6">6 meses</option>
							<option :value="12" v-if="Plazo>12" >12 meses</option>
							<option :value="18" v-if="Plazo>18">18 meses</option>
							<option :value="24" v-if="Plazo>24">24 meses</option>	
						</select>
						Meses
					</div>

					<div class="col-4"><br>
						<label for="">Fecha Inicial:</label>
					</div>
					<div class="col-8"><br>
						<input v-model="Fecha_inicial" type="date">
					</div>
				</div>									 				 
				<hr size="4px"/>
			</div>
		</div>

    	<div class="col">
      		<div class="p-3">
		 		<div class="row">					 					 				 
				<hr size="4px"/>
					<div class="col-4">
						<label title="Define el período entre cada pago al capital">Frec. de Pagos Capital:</label> 
					</div>
					<div class="col-8">
						<select  v-model="menu">
						<option :value="1">Mensual</option>
						<option :value="2">Bimestral</option>
						<option :value="3">Trimestral</option>
						<option :value="4" v-if="Plazo!= 6 && Plazo != 18">Cuatrimestral</option>
						<option :value="6">Semestral</option>	
						<option :value='"unico"'>Unico Pago</option>	
					</select>
					</div>
					<div class="col-4"><br>
						<label title="Define el período entre cada pago de interés">Frec. de Pagos Interés:</label> 
					</div>
					<div class="col-8"><br>
						<select v-model="mi">						
						<option :value="0">Mensual</option>	
						<option :value="1" selected="selected">Misma Frecuencia del Capital</option>
					</select>
					</div>					 				 
					<hr size="4px"/>

					<!-- Fin de Campos Agregados Recientemente -->
					<hr size="4px"/>
						<div class="col-4">
							<label><b>Pago Promedio:</b></label> 
						</div>
						<div class="col-4">
					<!--		<p class="mb-0">${{Math.round(Promedio)}}</p> -->
							<p class="mb-0">${{new Intl.NumberFormat().format(Promedio)}}</p>
						</div>
						<div class="col-4">MXN</div>

						<div class="col-4"><br>
							<label><b>Pago Máximo:</b></label>
						</div>
						<div class="col-4"><br>
					<!--		<p class="mb-0">${{Math.round(max)}}</p> -->
							<p class="mb-0">${{new Intl.NumberFormat().format(max)}}</p>
						</div>
						<div class="col-4"><br>MXN</div>

						<div class="col-4"><br>
							<label><b>Pago Mínimo:</b></label>
						</div>
						<div class="col-4"><br>
					<!--		<p class="mb-0">${{Math.round(min)}}</p> -->
							<p class="mb-0">${{new Intl.NumberFormat().format(min)}}</p>
						</div>
						<div class="col-4"><br>MXN</div>
				</div>
				<hr size="4px"/>
	  		</div>
    	</div>
  	</div>
</div>
	
<div class="wrap">
	<button @click="Generar_tabla" class="button" style="border-radius:10px; color: white;">Generar</button>
</div>

<br>

<!--parte de resultado de seleccion de datos-->
	<hr size="4px"/>
	<!--	<div class="row justify-content-center">
			<div class="col-auto"><b>Total Pago Principal:</b> ${{Monto}}</div>
			<div class="col-auto titulo"><b>Total Intereses:</b> ${{Math.round(Interes_t)}}</div>
			<div class="col-auto titulo-1"><b>Pago Total:</b> ${{Math.round(Pago_t)}}</div>
		</div> -->
		<div class="row justify-content-center">
				<div class="col-auto">Total Pago Principal: ${{m_formato}}</div>
				<div class="col-auto">Total Intereses: ${{new Intl.NumberFormat().format(Interes_t)}}</div>
				<div class="col-auto">Pago Total: ${{new Intl.NumberFormat().format(Pago_t)}}</div>
			</div>
	<hr size="4px"/>

<!--parte del segundo formulario que conecta el primero-->
<div>
    <table class="table table-striped" width="50%" border="3">
		<thead>
			<tr style="background-color: #e73130; color: #ffffff; border-radius: 8px; box-shadow: 5px 3px 13px 0;">
				<th class="col">N°</th>
				<th class="col">Mes</th>
				<th class="col">Saldo Inicial</th>
				<th class="col">Pago a Capital</th>
				<th class="col">Intereses</th>
				<th class="col">Pago Total</th>
				<th class="col">Saldo Final</th>
				<th class="col">Días Cobro Interés</th>
			</tr>
		</thead>
		<tbody v-for="(Item,i) in Formulas" :key="i">
			<tr>
				<th scope="row">{{Item.n}}</th>
				<td>{{Item.fecha}}</td>
				<td>${{new Intl.NumberFormat().format(Item.saldoI )}}</td>
				<td>${{new Intl.NumberFormat().format(Item.pago_capital)}}</td>
				<td>${{new Intl.NumberFormat().format(Item.interes)}}</td>
				<td>${{new Intl.NumberFormat().format(Item.pagototal)}}</td>
				<td>${{new Intl.NumberFormat().format(Item.saldoF)}}</td>
				<td>{{Item.dias_cobro}}</td>
			</tr>
		</tbody>
	</table>
</div>

</div>
</template>


<!--Seccion de los estilos al template JS-->
<script type="text/javascript">
	export default{
		data(){

			return{
				Monto:0,
				m_formato:0,
				Plazo:0,
				Tasa:0,
				Gracia:0,
				Fecha_inicial:0,
				Formulas:[],
				Promedio:0,
				max:0,
				min:0,
				Interes_t:0,
				Pago_t:0,
				Frecuencia_Capital:0,
				menu:1,
				mi:1


			}
		},
		computed:{
				convertir_tasa(){
					return this.Tasa/100
				},
				

		},

		
		methods:{
			Generar_tabla(){
					this.Formulas=[]
					let fecha=this.$moment(this.Fecha_inicial,"YYYY-MM-DD"),
					promedio=0
					this.Interes_t=0
					this.max=0
					this.min=null
					this.Pago_t=0
			
					
				for (var i = 1; i <= this.Plazo; i++) {
					console.log(fecha)
					
					let Fecha_anterior=fecha.clone()
					const pago_capital=this.getPagoACapital(i),
							saldoI=this.getSaldoInicial(pago_capital,i-1),
							saldoF=this.getSaldoFinal(saldoI,pago_capital)
					const dias_cobro=Fecha_anterior.add(1, 'months').diff(fecha, 'days'), 
					interes=this.getintereses(saldoI,dias_cobro,i),
					pagototal=this.getpago_total(pago_capital,interes,saldoI)
					this.Interes_t= (this.Interes_t + interes)
					this.Pago_t= (this.Pago_t + pagototal)
					this.Formulas[i-1]={
						n:i,
						fecha: fecha.locale("es").format("MMM YYYY"),
						pago_capital:pago_capital,
						saldoI:saldoI,
						interes:interes,
						pagototal:pagototal,
						saldoF:saldoF,
						dias_cobro:dias_cobro
						


					}
					fecha.add(1,"months")
					console.log(this.Pago_t)
					//promedio=this.Pago_t
					this.max = pagototal>this.max?pagototal:this.max
					
					if(this.min && pagototal != 0)
    					this.min = pagototal < this.min? pagototal: this.min
					else if (pagototal != 0)
    					this.min = pagototal

					//this.min= pagototal>=this.min && pagototal!=0?pagototal:this.min
					
					/*const dispersion=i==0?this.Monto:0,
					principal=i==0?0:parseInt((this.Gracia>i?0:(i==0?0:this.Monto/(this.Plazo-this.Gracia)))),
					saldo= i==0?dispersion-principal:(this.Formulas[i-1].Saldo-principal+dispersion)
					let Fecha_anterior=Fecha.clone()
					saldo =parseInt(saldo)
					const dias_cobro=i==0?0:Fecha.diff(Fecha_anterior.subtract(1, "months"),'days'),
					interes=i==0?0:parseInt((i==0?0:this.Formulas[i-1].Saldo*((this.Tasa/360)*dias_cobro))),
					pago =parseInt((i==0?0:principal+interes))
					
					this.Interes_t= parseInt ((this.Interes_t + interes))
					this.Pago_t= parseInt ((this.Pago_t + pago))
					//if (i>0)
					//console.log(`${this.Formulas[i-1].Saldo}*((${this.Tasa}/360)*${dias_cobro}))*100/100`)
					this.Formulas[i]= {

						Numero: i,
						Fecha: Fecha.locale("es").format("MMM YYYY"),
						Dispersion: dispersion,
						Principal: principal,
						Interes: interes,
						Saldo: i==this.Plazo?0:saldo,
						Dias_Cobro:dias_cobro,
						Pago: pago


					}*/
					
					//Fecha.add(1,"months")
				}
				//console.log(promedio,(this.Formulas.length-1))
				this.Promedio=Math.round(this.Pago_t/this.Plazo)
				//this.min= this.Formulas[this.Formulas.length-1].pagototal
				//i==1 || pagototal<this.min && pagototal>0?pagototal:this.min
			},
			getSaldoInicial(pago_capital,i){
			//Saldo Inicial-Pago Capitala
			if (this.menu==1) 
				return i==0||(this.Gracia>0 && this.Gracia>i)?this.Monto:this.Formulas[i-1].saldoI-pago_capital;
			else if(this.menu==2||this.menu==3||this.menu==4||this.menu==6){
				if (i==0)
					return this.Monto
				else
					return ((i+1) % this.menu)==0 || (this.Gracia>0 && this.Gracia>i) ?this.Formulas[i-1].saldoI:this.Formulas[i-1].saldoI-this.Formulas[i-1].pago_capital;
			}	
			else
				return this.Monto
			},
			getPagoACapital(n){
			//SI N°>Plazo,0,Monto/plazo
			//Monto/(Redondear((Plazo-Gracia)/Menu)+1)
			
			if(this.menu=="unico")
				return this.Plazo==n?this.Monto:0
			else{
				if((n % this.menu) !=0|| (this.Gracia>0 && this.Gracia>(n)))
					return 0
				else if (this.Gracia>0 && this.Gracia !== this.menu)
					return this.Monto/(Math.floor((this.Plazo-this.Gracia)/this.menu)+1)
				else
					return (this.Monto/this.Plazo)*this.menu;
				}
			},
			getintereses(saldo_inicial,dias_cobro,n){
				//Saldo Inicial*((tasa/360)*Dias de cobro)
				if (this.mi==0){
							return (saldo_inicial*(this.convertir_tasa/360)*dias_cobro)
				}
				else if ((((n % this.menu) != 0|| (this.Gracia>0 && this.Gracia>(n))) && this.menu != 'unico') || (this.menu == 'unico' && n != this.Plazo))
					return 0
				else{
					const m=this.menu=="unico"?this.Plazo:this.menu 
					console.log(m)
					let interes =0
					//(gracia > 0 && ((gracia < menu && gracia>=n) || (gracia > menu && gracia > ((gracia % menu) + gracia))))
					if (this.Gracia>0 && ((this.Gracia< this.menu && this.Gracia>=n)|| (this.Gracia>this.menu && n<=((this.Gracia % this.menu)+this.Gracia)))){
						console.log("Primer IF", n)

						for ( let i=n; i!=0;i--){
							console.log("FOR", i)
							if(i==n)
							interes=(saldo_inicial*(this.convertir_tasa/360)*dias_cobro)
							else
							interes=interes+(saldo_inicial*(this.convertir_tasa/360)*this.Formulas[n-i-1].dias_cobro)
						
						}
					}
					else{
						console.log("Else", n)
						for ( let i=m; i!=0;i--){

						if(i==m)
							interes=(saldo_inicial*(this.convertir_tasa/360)*dias_cobro)
						else
						interes=interes+(saldo_inicial*(this.convertir_tasa/360)*this.Formulas[n-i-1].dias_cobro)
						
						}
					}
					return interes
				}
					
			},
			getSaldoFinal(saldo,pago){//Saldo Inicial -Pago Capital
				return saldo-pago
			},
			
			getpago_total(pago_capital,interes,saldo_inicial){
				//SI((Pago Capital+Intereses)=0,0,Saldo Inicial+Pago Capital

				return pago_capital+interes==0?0:(interes+pago_capital)

			}
		},
		watch:{
			Monto:function(uno,dos){
			this.$nextTick(()=>{
				if (this.$refs.monto)
					this.m_formato= this.$refs.monto.valFormat;
			})
			
			}


		}

	}
</script>

<!--<script type="text/javascript">
	export default{
		data(){

			return{
				Monto:17000,
				Plazo:0,
				Tasa:0,
				Gracia:0,
				Fecha_inicial:0,
				Formulas:[],
				Promedio:0,
				max:0,
				min:0,
				Interes_t:0,
				Pago_t:0,
				Frecuencia_Capital:0,
				menu:1,
				mi:1


			}
		},

		
		methods:{
			Generar_tabla(){
					this.Formulas=[]
					let fecha=this.$moment(this.Fecha_inicial,"YYYY-MM-DD"),
					promedio=0
					this.Interes_t=0
					this.max=0
					this.min=null
					this.Pago_t=0
			
					
				for (var i = 1; i <= this.Plazo; i++) {
					console.log(fecha)
					
					let Fecha_anterior=fecha.clone()
					const pago_capital=this.getPagoACapital(i),
							saldoI=this.getSaldoInicial(pago_capital,i-1),
							saldoF=this.getSaldoFinal(saldoI,pago_capital)
					const dias_cobro=Fecha_anterior.add(1, 'months').diff(fecha, 'days'), 
					interes=this.getintereses(saldoI,dias_cobro,i),
					pagototal=this.getpago_total(pago_capital,interes,saldoI)
					this.Interes_t= (this.Interes_t + interes)
					this.Pago_t= (this.Pago_t + pagototal)
					this.Formulas[i-1]={
						n:i,
						fecha: fecha.locale("es").format("MMM YYYY"),
						pago_capital:pago_capital,
						saldoI:saldoI,
						interes:interes,
						pagototal:pagototal,
						saldoF:saldoF,
						dias_cobro:dias_cobro
						


					}
					fecha.add(1,"months")
					console.log(this.Pago_t)
					//promedio=this.Pago_t
					this.max = pagototal>this.max?pagototal:this.max
					
					if(this.min && pagototal != 0)
    					this.min = pagototal < this.min? pagototal: this.min
					else if (pagototal != 0)
    					this.min = pagototal

					
				}
				//console.log(promedio,(this.Formulas.length-1))
				this.Promedio=Math.round(this.Pago_t/this.Plazo)
				//this.min= this.Formulas[this.Formulas.length-1].pagototal
				//i==1 || pagototal<this.min && pagototal>0?pagototal:this.min
			},
			getSaldoInicial(pago_capital,i){
			//Saldo Inicial-Pago Capitala
			if (this.menu==1) 
				return i==0||(this.Gracia>0 && this.Gracia>i)?this.Monto:this.Formulas[i-1].saldoI-pago_capital;
			else if(this.menu==2||this.menu==3||this.menu==4||this.menu==6){
				if (i==0)
					return this.Monto
				else
					return ((i+1) % this.menu)==0 || (this.Gracia>0 && this.Gracia>i) ?this.Formulas[i-1].saldoI:this.Formulas[i-1].saldoI-this.Formulas[i-1].pago_capital;
			}	
			else
				return this.Monto
			},
			getPagoACapital(n){
			//SI N°>Plazo,0,Monto/plazo
			//Monto/(Redondear((Plazo-Gracia)/Menu)+1)
			
			if(this.menu=="unico")
				return this.Plazo==n?this.Monto:0
			else{
				if((n % this.menu) !=0|| (this.Gracia>0 && this.Gracia>(n)))
					return 0
				else if (this.Gracia>0 && this.Gracia !== this.menu)
					return this.Monto/(Math.floor((this.Plazo-this.Gracia)/this.menu)+1)
				else
					return (this.Monto/this.Plazo)*this.menu;
				}
			},
			getintereses(saldo_inicial,dias_cobro,n){
				//Saldo Inicial*((tasa/360)*Dias de cobro)
				if (this.mi==0){
							return (saldo_inicial*(this.Tasa/360)*dias_cobro)
				}
				else if ((((n % this.menu) != 0|| (this.Gracia>0 && this.Gracia>(n))) && this.menu != 'unico') || (this.menu == 'unico' && n != this.Plazo))
					return 0
				else{
					const m=this.menu=="unico"?this.Plazo:this.menu 
					console.log(m)
					let interes =0
					//(gracia > 0 && ((gracia < menu && gracia>=n) || (gracia > menu && gracia > ((gracia % menu) + gracia))))
					if (this.Gracia>0 && ((this.Gracia< this.menu && this.Gracia>=n)|| (this.Gracia>this.menu && n<=((this.Gracia % this.menu)+this.Gracia)))){
						console.log("Primer IF", n)

						for ( let i=n; i!=0;i--){
							console.log("FOR", i)
							if(i==n)
							interes=(saldo_inicial*(this.Tasa/360)*dias_cobro)
							else
							interes=interes+(saldo_inicial*(this.Tasa/360)*this.Formulas[n-i-1].dias_cobro)
						
						}
					}
					else{
						console.log("Else", n)
						for ( let i=m; i!=0;i--){

						if(i==m)
							interes=(saldo_inicial*(this.Tasa/360)*dias_cobro)
						else
						interes=interes+(saldo_inicial*(this.Tasa/360)*this.Formulas[n-i-1].dias_cobro)
						
						}
					}
					return interes
				}
					
			},
			getSaldoFinal(saldo,pago){//Saldo Inicial -Pago Capital
				return saldo-pago
			},
			
			getpago_total(pago_capital,interes,saldo_inicial){
				//SI((Pago Capital+Intereses)=0,0,Saldo Inicial+Pago Capital

				return pago_capital+interes==0?0:(interes+pago_capital)

			}
		},

	}
</script> -->


<!--Seccion de los estilos al template CSS-->
<style lang="scss">
.img{ 
	width: 350px;
    height: 135px;
}

h2{
	font-family: "Montserrat";
	color: #fff;
	background-color: #e73130;
}

th{
	font-family: "Montserrat";
	font-size: 18px;
}


/* estilo de boton */
.wrap {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: left;
}

.button {
	min-width: 30px;
	min-height: 30px;
	font-family: 'Monserrat';
	font-size: 15px;
	text-transform: uppercase;
	letter-spacing: 1.3px;
	font-weight: 700;
	color: #313133;
	background: #e73130;
	background: linear-gradient(90deg, #e73130 0%, #e73130 100%);
	border: none;
	border-radius: 100px;
	box-shadow: 12px 12px 24px #e73130;
	transition: all 0.3s ease-in-out 0s;
	cursor: pointer;
	outline: none;
	position: relative;
	padding: 10px;
}

button::before {
content: '';
	border-radius: 10px;
	min-width: calc(130px + 10px);
	min-height: calc(55px + 10px);
	border: 6px solid #e73130;
	box-shadow: 0 0 60px #e73130;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 0;
	transition: all .3s ease-in-out 0s;
}

.button:hover, .button:focus {
	color: #313133;
	transform: translateY(-6px);
}

button:hover::before, button:focus::before {
opacity: 1;
}

button::after {
	content: '';
	width: 30px; height: 30px;
	border-radius: 100%;
	border: 6px solid #e73130;
	position: absolute;
	z-index: -1;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: ring 1.5s infinite;
}

button:hover::after, button:focus::after {
	animation: none;
	display: none;
}

@keyframes ring {
0% {
    width: 30px;
    height: 30px;
    opacity: 1;
}
100% {
    width: 200px;
    height: 200px;
    opacity: 0;
}
}

.titulo{
	margin-left: 110px;
}

.titulo-1{
	margin-left: 110px;
}

.title{
	Color: white !important;
}

</style>