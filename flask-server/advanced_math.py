import math
import re
#(Rohan) - Working on adding the basics of advanced math
class AdvancedMath:
    def process(self, expression, isDegreeMode): 
        # Remove whitespace
        expression = expression.replace(" ", "")
        
        # Check for valid characters including allowed functions
        if not re.match(r'^[π\d+\-*%^/()|.!a-z]+$', expression):
             print("error not valid")
             raise ValueError("Expression contains invalid characters.")
        
        print("before adding * " + expression)
        # Insert multiplication symbol between number and trig functions or constants
        expression = self.insert_multiplication(expression)
        print("after adding * " + expression)

        print(isDegreeMode)
        if(isDegreeMode):
            expression = self.replace_to_degrees(expression)
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
    


    # Anusha Patel- degrees and radians switch
    def replace_to_degrees(self, expression):
        print("in the function to replace")

        # Use regular expressions to match and replace sin, cos, and tan
        expression = re.sub(r'\bsin\(([^)]+)\)', r'sin(math.radians(\1))', expression)
        expression = re.sub(r'\bcos\(([^)]+)\)', r'cos(math.radians(\1))', expression)
        expression = re.sub(r'\btan\(([^)]+)\)', r'tan(math.radians(\1))', expression)

        print("after replacing to degrees: " + expression)
        return expression



    def insert_multiplication(self, expression):
        # Pattern to detect a number followed by a trig function or constants
        pattern = r'(\d)([a-zA-Z\(π])'
        
        # Insert '*' between the number and the function/constant
        expression = re.sub(pattern, r'\1*\2', expression)
        
        return expression
    def replace_functions(self, expression):
        # Mapping of function names in the expression to the `math` module's functions
       
        function_map = {
            'sin': 'math.sin',
            'cos': 'math.cos',
            'tan': 'math.tan',

            # 'sind': 'math.sin(math.radians)',
            # 'cosd': 'math.cos(math.radians)',
            # 'tand': 'math.tan(math.radians)',
            
           

            'log': 'math.log10',  # Log base 10
            'ln': 'math.log',      # Natural log
            'sqrt': 'math.sqrt',
            # (Trisha) - adding more functions
         
            # (Rohan) - Adding advanced symbols
            'e': 'math.e',      
            'π': 'math.pi',
            '\^': '**'
            
            
            
        }
        
        # Replace each function name in the expression with `math` function
        for func, math_func in function_map.items():
            expression = re.sub(rf'\b{func}\b', math_func, expression)

       

        # Replace factorial symbol '!' with math.factorial
        expression = re.sub(r'(\d+)!', r'math.factorial(\1)', expression)
        
        print("final expression is " + expression)
        return expression
