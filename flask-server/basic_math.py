# Anusha Patel use case basic calculations
import re

class BasicMath:
    def process(self, expression):
        # Strip any whitespace
        expression = expression.replace(" ", "")
        
        # 1. Check for allowed characters
        if not re.match(r'^[\d+\-*/().]+$', expression):
            raise ValueError("Expression contains invalid characters.")
        
        # 2. Check for balanced parentheses
        if not self.balanced_parentheses(expression):
            raise ValueError("Expression has unbalanced parentheses.")
        
        # 3. Check for valid syntax
        if not self.valid_syntax(expression):
            raise ValueError("Expression syntax is invalid.")
        
        # If all checks pass, evaluate the expression
        return eval(expression)

    def balanced_parentheses(self, expression):
        # Helper to check balanced parentheses
        stack = []
        for char in expression:
            if char == '(':
                stack.append(char)
            elif char == ')':
                if not stack:
                    return False
                stack.pop()
        return not stack

    def valid_syntax(self, expression):
        # Helper to check for valid syntax using a regular expression
        # This checks for sequences of operators or invalid characters.
        
        # 1. Check for consecutive operators (e.g., ++, --, **, etc.)
        if re.search(r'[+\-*/]{2,}', expression):
            return False
        
        # 2. Ensure expression doesn't end with an operator that is invalid (can start with + or -)
        if re.match(r'^[\*/]', expression) or re.match(r'[+\-*/]$', expression):
            return False
        
        return True

    