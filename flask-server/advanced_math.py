import math
import re
#(Rohan) - Working on adding the basics of advanced math
class AdvancedMath:
    def process(self, expression): 
        # Remove whitespace
        expression = expression.replace(" ", "")
        
        # Check for valid characters including allowed functions
        if not re.match(r'^[\d+\-*/().a-z]+$', expression):
            raise ValueError("Expression contains invalid characters.")

        # Evaluate the expression after replacing functions with the correct methods
        expression = self.replace_functions(expression)
        return eval(expression)
    
    def replace_functions(self, expression):
        # Mapping of function names in the expression to the `math` module's functions
        function_map = {
            'sin': 'math.sin',
            'cos': 'math.cos',
            'tan': 'math.tan',
            'abs': 'math.fabs',
            'log': 'math.log10',  # Log base 10
            'ln': 'math.log',      # Natural log
            'sqrt': 'math.sqrt'
        }
        
        # Replace each function name in the expression with `math` function
        for func, math_func in function_map.items():
            expression = re.sub(rf'\b{func}\b', math_func, expression)
        
        return expression
