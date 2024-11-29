# Anusha Patel- equation solving functionality 
from sympy import symbols, Eq, solve
from sympy.parsing.sympy_parser import parse_expr
import re

class EquationSolver:
    
    def solve_equation(self, equation):
        # Add '*' between numbers and variables (e.g., '3x' to '3*x')
        equation = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', equation)

        # Replace '^' with '**' for exponentiation
        equation = equation.replace('^', '**')

        # Split the equation into left and right sides based on '='
        left_side, right_side = equation.split('=')
        x = symbols('x')
        
        # Parse each side of the equation
        left_expr = parse_expr(left_side)
        right_expr = parse_expr(right_side)
        
        # Create the equation and solve it
        eq = Eq(left_expr, right_expr)
        solutions = solve(eq, x)
        
        return [str(sol.evalf()) for sol in solutions]  # Convert solutions to string format
