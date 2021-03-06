



// calculate a random number where:  a <= rand < b
function rand(a, b){
    return (b-a)*Math.random() + a;
	}


function rep_list (xs,times){
var rtn = [];
for ( var i = 0; i<times;i++) {
rtn.push(xs);
}
return rtn;
}	
	
function  generateMatrix(I, J, fill){
    m = [];
	for ( var i = 0 ; i< I; i++) {
        entry = [];
		for ( var j = 0 ; j< J; j++){ 
		  entry.push([rand(-0.2, 0.2)]);
		}
        m.push(entry);
	}
    return m
	}


	
var sigmoid = function ( x ) {
//return Math.tanh(x);
return ( 1 / ( 1 + Math.exp(-1 * x ) ) );

}

var sigmoid_derivative = function (x ) {
//return 1.0 - y*y;
return  sigmoid(x) * ( 1 - sigmoid(x));
}

var NN = function (ni,nh,no){ // number of input, hidden, and output nodes
        
		var self = this;
        
        self.ni = ni + 1; // +1 for bias node
        self.nh = nh;
        self.no = no;

        // activations for nodes
        self.ai = rep_list ([1.0],self.ni);
        self.ah = rep_list ([1.0],self.nh);
        self.ao = rep_list ([1.0],self.no);
        
        // create weights
        self.wi = generateMatrix(self.ni, self.nh, 0);
        self.wo = generateMatrix(self.nh, self.no, 0);
        // set them to random values
		//return self;
		/**
        for (var i = 0; i < self.ni; i++) {
            for (var j = 0; i < self.nh; j++) {
                self.wi[i][j] = rand(-0.2, 0.2);
			}
		}
		
        for (var j = 0; j< self.nh ; j++) {
            for (var k = 0;k< self.no; k++) {
                self.wo[j][k] = rand(-2.0, 2.0);
				}
		}
		**/
        
        // last change in weights for momentum   
        self.ci = generateMatrix(self.ni, self.nh,0);
        self.co = generateMatrix(self.nh, self.no,0);

    self.update = function( inputs) {
        if (inputs.length != self.ni-1){
            console.log('Inputs mismatch');
			return;
			}

        // input activations
        for (var i=0; i< self.ni-1; i++){
           
            self.ai[i] = inputs[i];
	    }

        // hidden activations
        for (var j = 0 ; j< self.nh; j++){
            sum = 0.0;
            for (var i=0; i< self.ni ; i++) {
                sum = sum + self.ai[i] * self.wi[i][j];
			}
            self.ah[j] = sigmoid(sum);
        }
        // output activations
        for (var k =0 ;k<self.no;k++){
            sum = 0.0;
            for (var j = 0; j< self.nh ; j++) {
                sum = sum + self.ah[j] * self.wo[j][k];
		    }
            self.ao[k] = sigmoid(sum);
        }
        return self.ao;
    };


    self.backPropagate = function(targets, N, M){
        if (targets.length != self.no) {
            console.log('wrong number of target values');
			return;
			}
			

        // calculate error terms for output
        output_deltas = rep_list ([0.0],self.no);
        for (var k = 0; k< self.no; k++){
            error = targets[k]-self.ao[k];
            output_deltas[k] = sigmoid_derivative(self.ao[k]) * error;
        }
        // calculate error terms for hidden
        hidden_deltas = rep_list ([0.0],self.nh);
        for (var j =0; j<self.nh; j++){
            error = 0.0;
            for (var k = 0 ; k< self.no; k++ ) {
                error = error + output_deltas[k]*self.wo[j][k];
			}
            hidden_deltas[j] = sigmoid_derivative(self.ah[j]) * error;
        }
        // update output weights
        for (var j=0;j< self.nh;j++) {
            for (var k = 0; k< self.no; k++){
                change = output_deltas[k]*self.ah[j];
                self.wo[j][k] = parseFloat(self.wo[j][k]) + parseFloat(N*change) +parseFloat( M*self.co[j][k]);
                self.co[j][k] = change;
				}
                //print N*change, M*self.co[j][k]
        }
        // update input weights
        for (var i=0; i< self.ni; i++){
            for (var j =0; j <self.nh ; j++) {
                change = parseFloat(hidden_deltas[j])*parseFloat(self.ai[i]);
                self.wi[i][j] =parseFloat(self.wi[i][j])+ parseFloat(N)*parseFloat(change) + parseFloat(M*self.ci[i][j]);
                self.ci[i][j] = change;
				
			}
				
		}

        // calculate error
        error = 0.0;
        for (var k=0; k< targets.length; k++){
            error = error + 0.5*(targets[k]-self.ao[k])*(targets[k]-self.ao[k]);
		}
        return error;
		
		};


    self.test= function( patterns){
        for (var p =0 ; p< patterns.length; p++){
            console.log(patterns[p][0], '>>>', self.update(patterns[p][0]));
			
			}
    };
	/**
    def weights(self):
        print('Input weights:')
        for i in range(self.ni):
            print(self.wi[i])
        print()
        print('Output weights:')
        for j in range(self.nh):
            print(self.wo[j])
**/
    self.train = function(patterns, iter, N, M){
        // N: learning rate 0.5
        // M: momentum factor 0.1
        for (var i =0 ; i<iter; i++) {
            error = 0.0;
            for (var p=0; p< patterns.length;p++){
                inputs = patterns[p][0];
                targets = patterns[p][1];
                self.update(inputs);
                error = error + self.backPropagate(targets, N, M);
				}
            if (i % 100 == 0) {
                console.log('error '+ error);
				}
				
		}
		};
		
return self;
}



