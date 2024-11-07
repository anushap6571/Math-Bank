# matrix.py
import numpy as np

def multiply_matrices(matrix_a, matrix_b):
    try:
        result = np.dot(matrix_a, matrix_b).tolist()
        return result
    except ValueError:
        return {"error": "Incompatible matrix dimensions for multiplication"}

def rref(matrix):
    try:
        mat = np.array(matrix, dtype=float)
        # Perform Gaussian elimination to RREF
        rows, cols = mat.shape
        lead = 0
        for r in range(rows):
            if lead >= cols:
                break
            i = r
            while mat[i][lead] == 0:
                i += 1
                if i == rows:
                    i = r
                    lead += 1
                    if cols == lead:
                        return mat.tolist()
            mat[[r, i]] = mat[[i, r]]
            lv = mat[r][lead]
            mat[r] = mat[r] / lv
            for i in range(rows):
                if i != r:
                    lv = mat[i][lead]
                    mat[i] = mat[i] - lv * mat[r]
            lead += 1
        return mat.tolist()
    except Exception as e:
        return {"error": str(e)}
    
def determinant(matrix):
    try:
        mat = np.array(matrix)
        if mat.shape[0] != mat.shape[1]:
            return {"error": "Determinant is only defined for square matrices"}
        det = float(np.linalg.det(mat))
        return det
    except Exception as e:
        return {"error": str(e)}