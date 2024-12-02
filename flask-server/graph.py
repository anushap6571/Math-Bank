import numpy as np
import plotly.graph_objs as go
import os
from sympy import symbols
from sympy.parsing.sympy_parser import parse_expr
import re
from datetime import datetime 
# Anusha Patel- graphing feautures 
class Graph:
    
    def plot_equation(self, equation):

         # Ensure equation supports exponentiation by replacing '^' with '**'
        equation = equation.replace('^', '**')
        
        # Pattern to detect a number followed by a trig function or constants
        pattern = r'(\d)([a-zA-Z\(π])'
    
        # Insert '*' between the number and the function/constant
        equation = re.sub(pattern, r'\1*\2', equation)
        
        x = symbols('x')
        equation = parse_expr(equation.replace('=', '-(') + ')')

        # Generate values for plotting
        x_vals = np.linspace(-10, 10, 400)
        y_vals = [float(equation.subs(x, val).evalf()) for val in x_vals]

        # Create a Plotly figure
        fig = go.Figure()

        # Add a trace for the equation
        fig.add_trace(go.Scatter(x=x_vals, y=y_vals, mode='lines', name=f'y = {equation}'))

        # Update layout for better visualization
        fig.update_layout(
            title='Graph of the Equation',
            xaxis_title='x',
            yaxis_title='y',
            showlegend=True,
            hovermode='closest'
        )

        # Ensure the 'assets' directory exists

        assets_dir = 'assets'
        try:
            if not os.path.exists(assets_dir):
                os.makedirs(assets_dir)  # Create the directory if it doesn't exist
            
            # Generate a unique filename using a timestamp
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            graph_path = os.path.join(assets_dir, f'graph_{timestamp}.html')
            
            # Save the figure as HTML
            fig.write_html(graph_path)

        except Exception as e:
            print(f"Error creating or writing to directory: {e}")
            return {"error": "Unable to save graph. Check directory permissions."}
        
        fig.write_html(graph_path)

        print(f"Graph saved at: {graph_path}")  # Debugging line
        return {"graph": graph_path}
