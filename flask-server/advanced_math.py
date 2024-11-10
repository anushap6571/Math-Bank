import math
import re
#(Rohan) - Working on adding the basics of advanced math
class AdvancedMath:
    def process(self, expression): 
        # Remove whitespace
        expression = expression.replace(" ", "")
        
        # Check for valid characters including allowed functions
        if not re.match(r'^[\d+\-*/()|.a-z]+$', expression):
            raise ValueError("Expression contains invalid characters.")
        
        # (Rohan) Replace absolute value expressions
        expression = self.replace_absolute_values(expression)

        # Evaluate the expression after replacing functions with the correct methods
        expression = self.replace_functions(expression)
        return eval(expression)
    
        # (Rohan) - absolute value handling
    def replace_absolute_values(self, expression):
        # Regular expression to find absolute value patterns
        pattern = r'\|([^|]+)\|'
        while re.search(pattern, expression):
            expression = re.sub(pattern, r'math.fabs(\1)', expression)
        return expression
    
    def replace_functions(self, expression):
        # Mapping of function names in the expression to the `math` module's functions
        function_map = {
            'sin': 'math.sin',
            'cos': 'math.cos',
            'tan': 'math.tan',
            'abs': 'math.fabs',
            'log': 'math.log10',  # Log base 10
            'ln': 'math.log',      # Natural log
            'sqrt': 'math.sqrt',
            # (Trisha) - adding more functions
            '^': 'math.pow',
            'sind': 'math.radians(math.sin)',
            'cosd': 'math.radians(math.cos)',
            'tand': 'math.radians(math.tan)',
            # (Rohan) - Adding advanced symbols
            'e': 'math.e',      
            'π': 'math.pi',
            '^': '**',   
        }
        
        # Replace each function name in the expression with `math` function
        for func, math_func in function_map.items():
            expression = re.sub(rf'\b{func}\b', math_func, expression)

        # Replace exponentiation symbol '^' with '**'
        expression = expression.replace('^', '**')

        # Replace factorial symbol '!' with math.factorial
        expression = re.sub(r'(\d+)!', r'math.factorial(\1)', expression)
        
        return expression
