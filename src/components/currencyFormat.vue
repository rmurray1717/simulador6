<template>
    <div class="currency_input" :style="{ minWidth: minWidth, maxWidth: maxWidth }">
        <input type="text" ref="input" :key="reset" :value="valFormat" @input="removeFormat" @keydown.delete="deleteAction">
    </div>
</template>

<script>
    export default {
        props: {
            minWidth: { require: false, default: '300px' },
            maxWidth: { require: false, default: '300px' },
            decimals: { require: false, default: 2 },
            value: ''
        },
        data(){
            return{
                valFormat: 0,
                val: 0,
                lastCursotP: 0,
                commas: 0,
                movePointer: 0,
                reset: 0
            }
        },
        created(){ // Do someting before create the html component
            this.val = this.value;
            this.setFormat();
        },
        methods: {
            setFormat(){
                if(this.val == ''){ // If val is '' break fuction
                    this.valFormat = '';
                    return;
                }

                let val = parseInt(this.val);
                let valArr = (val+'').split('');

                // Calculate the number of points "," 
                let commas = (valArr.length)/3;

                if(commas % 1 != 0) // Checking if var has decimals
                    commas = Math.trunc(commas); // Round down 
                else
                    commas -= 1;
                
                if(this.$refs.input)
                    this.lastCursotP = this.$refs.input.selectionStart;
                
                // Set format
                let cont = commas;
                let format = valArr.reverse().reduce( (arr, item, index) => {
                    let ctr = arr;

                    if((index+1) % 3 == 0 && cont > 0){ // Add a point "," each 3 caracters
                        cont -= 1;
                        ctr = `${ctr}${item},`;
                    }
                    else if(index == (valArr.length - 1)){ // Add decimals ".xxx" at the end
                        ctr = `${ctr}${item}`;
                        ctr = ctr.split('').reverse().join('');
                        ctr = `${ctr}.`;
                        for(let i = 0; i < this.decimals; i++)
                            ctr = `${ctr}0`;
                    }
                    else // Add number
                        ctr = `${ctr}${item}`;

                    return ctr;
                }, '');
                this.commas = commas;
                this.valFormat = format;
            },
            removeFormat(evt){ // Return the val without format
                let val = evt.target.value,
                     delPosition = evt.target.selectionStart;
                let resetFormat = false;
                const dp = val.indexOf('.'),
                      dpLength = val.substring(dp).length;

                

                if(dp>0) val = val.substring(0,dp) // Remove decimals
                val = val.replaceAll(',',''); // Remove commas
                val = val.split('').reduce( (arr, item, index) => { // Remove characters that aren't a number

                    if(!isNaN(parseInt(item)))
                       return arr = [ ...arr, item ];
                    else{
                       resetFormat = true;
                       return arr = [ ...arr, '' ];
                    }

                }, []).join('');

                if(dpLength > (this.decimals + 1)) //Avoid to edit decimals
                    resetFormat = true;

                if(!val)
                    val = '';
                
                this.$emit('input', parseInt(val));
                
                if(resetFormat){
                    this.setFormat();
                    this.reset += 1;
                    this.$nextTick( () => {
                        this.moveCursor(delPosition-1);
                    })
                }
            },
            deleteAction(evt){ // Avoid deleting commas or decimals
                const dp = this.valFormat.indexOf('.'), // Getting decimal position     
                      delPosition = evt.target.selectionStart, // Getting cursor position  
                      ctr = this.valFormat.split('')[delPosition-1];

                if(delPosition > dp || ctr == ','){
                    this.moveCursor(dp);
                    evt.preventDefault();
                }
            },
            moveCursor(pos){
                if(this.$refs.input.setSelectionRange){
                    this.$refs.input.focus();
                    this.$refs.input.setSelectionRange(pos,pos);
                }
            }
        },
        watch:{ // Vue events on change a var
            value: function(newVal){
                this.val = newVal;
                this.setFormat();
            },
            valFormat: function(newVal){
                this.$nextTick( () => { // Await to finish render valFormat on input
                    const dp = newVal.indexOf('.'); // Getting decimal position                    
                    let pos = this.lastCursotP + this.movePointer; // Move pointer position

                    if(pos > dp) pos = dp; 

                    this.moveCursor(pos);
                    this.movePointer = 0;
                })
            },
            commas: function(newVal, oldVal){
                if(newVal != oldVal && newVal > 0){
                    const ctr = this.valFormat.split('')[this.lastCursotP];
                    
                    if(newVal > oldVal && ctr != ',')
                        this.movePointer += 1;
                    else if(newVal < oldVal)
                        this.movePointer -= 1;
                }
            }
        }
    }
</script>