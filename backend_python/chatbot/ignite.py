import openfabric_pysdk

if __name__ == '__main__':
    from main import get_input_type, get_output_type, execute
    from openfabric_pysdk.register import OpenfabricRegister

    OpenfabricRegister.input_type = get_input_type()
    OpenfabricRegister.output_type = get_output_type()
    OpenfabricRegister.execution_function = execute
    from openfabric_pysdk.starter import OpenfabricStarter

    OpenfabricStarter.ignite(debug=False, host="0.0.0.0")
