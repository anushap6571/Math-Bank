from sympy import sympify, solve

class EquationSolver:
    # do input validation
    def process(self, expression):
        sympy_eq = sympify("Eq(" + expression.replace("=", ",") + ")")
        return solve(sympy_eq)   