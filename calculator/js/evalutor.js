class Postfix {
	/**
	*	Postifix evalutor, accept an infix expression and convert into 
	*	postfix expression for a better evalution.
	*
	*	Read more about infix and postfix expression
	*   - https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/
	*/

	ops = {"*": 2, "%": 2, "/": 2 , "-": 1, "+": 1}

	/**
	 * Check a given character is one of allowed operators
	 * @param  {String} char character to be checked.
	 * @return {Boolean}     true if a character is operator false otherwise.
	 */
	isOperator(char) {

		return char in this.ops
	}

	/**
	 * Compare a gived operators precedence
	 * @param  {String} op1  first operator
	 * @param  {String} op2  second operator 
	 * @return {Boolean}     true if a first operator precedence is greater that or
	 * 						 equal with second operator is operator false otherwise.
	 */
	isHiger(op1, op2) {return this.ops[op1] >= this.ops[op2]}

	/**
	 * Convert a given infix expression into a postfix expression
	 * @param  {String} infix_expression  infix expression that needed to be converted
	 * @return {String}     			  postfix expression
	 */
	toExpression(infix_expression) {
		Array.prototype.empty = function() { return this.length == 0 }
		Array.prototype.top = function() { return this[this.length - 1] }

		var postfix_exp = []
		var operators = []

		for(var char of infix_expression.split(" ")) {
			if (this.isOperator(char)){
				if (operators.empty()){
					operators.push(char)
				}
				else {
					while (!operators.empty() && this.isHiger(operators.top(), char)){
						postfix_exp.push(operators.pop())
					}
					operators.push(char)
				}
			}
			else {
				postfix_exp.push(char)
			}
		}
		while (!operators.empty()) {
			postfix_exp.push(operators.pop())
		}
		return postfix_exp.join(" ");
	}
}

/**
 * Evaluate a given infix expression by converting into postfix
 * @param  {String} infix_expression  infix expression to be evaluated
 * @return {Integer}     			  evaluation result
 */
function evaluate(infix_expression) {
	var postfix= new Postfix()
	var values = []

	postfix_expression = postfix.toExpression(infix_expression).split(" ")
	for (var char of postfix_expression) {
		if (postfix.isOperator(char)) {
			var y = values.pop()
			var x = values.pop()
			values.push(eval(`${x} ${char} ${y}`))
		} else {
			values.push(char)
		}
	}
	return values[0];
}