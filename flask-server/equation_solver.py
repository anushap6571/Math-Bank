from sympy import symbols, Eq, solve
from sympy.parsing.sympy_parser import parse_expr

class EquationSolver:
    
    def solve_equation(self, equation):
            equation = equation.replace("", "")
            x = symbols('x')
            # Parse the equation and solve it
            equation = parse_expr(equation.replace('=', '-(') + ')')
            solutions = solve(Eq(equation, 0), x)
            return [str(sol.evalf()) for sol in solutions]  # Convert solutions to string format for JSON response