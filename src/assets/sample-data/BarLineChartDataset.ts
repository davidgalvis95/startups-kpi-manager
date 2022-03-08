export const sampleDataSet = {
  importantKpis: [
    {
      name: "Ventas",
      value: 500000,
      und: "USD",
    },
    {
      name: "Ventas Online",
      value: 200000,
      und: "USD",
    },
    {
      name: "Ventas Por Redes Sociales",
      value: 300000,
      und: "USD",
    },
    {
      name: "Margen",
      value: -5000,
      und: "USD",
    },
  ],
  allKpisDetailed: [
    {
      name: "Ventas",
      und: "USD",
      total: [
        70000, 90000, 110000, 100000, 90000, 50000, 58000, 90000, 95000, 170000,
        135000,
      ],
      labelType: "Fecha (Ejemplo: ene-2022, feb-2022)",
      labels: [
        "Ene-2021",
        "Feb-2021",
        "Mar-2021",
        "Abr-2021",
        "May-2021",
        "Jun-2021",
        "Jul-2021",
        "Ago-2021",
        "Sep-2021",
        "Oct-2021",
        "Nov-2021",
      ],
      chartTypes: ["Barras", "Anillo", "Barras Agrupadas", "Linea"],
      attributesGroupName: "Canal de Venta",
      attributes: [
        {
          name: "Ventas Presenciales",
          values: [
            70000, 90000, 110000, 100000, 90000, 50000, 58000, 90000, 95000,
            170000, 135000,
          ],
        },
        {
          name: "Ventas Online",
          values: [
            100000, 150000, 120000, 140000, 170000, 160000, 58000, 180000,
            98000, 145000, 130000,
          ],
        },
        {
          name: "Ventas Por Redes Sociales",
          values: [
            50000, 15000, 12000, 70000, 90000, 81000, 50000, 40000, 30000,
            45000, 30000,
          ],
        },
      ],
    },
    {
      name: "Empleados por Contrato",
      und: "USD",
      total: [300, 305, 310, 315, 300, 280, 290, 310, 295, 320, 305],
      labelType: "Texto (Ejemplo: Negro, Gris, Blanco)",
      labels: [
        "Ene-2021",
        "Feb-2021",
        "Mar-2021",
        "Abr-2021",
        "May-2021",
        "Jun-2021",
        "Jul-2021",
        "Ago-2021",
        "Sep-2021",
        "Oct-2021",
        "Nov-2021",
      ],
      chartTypes: ["Barras", "Anillo", "Barras Agrupadas", "Linea"],
      attributesGroupName: "Tipo de Contrato",
      attributes: [
        {
          name: "Contrato Directo",
          values: [300, 305, 310, 315, 300, 280, 290, 310, 295, 320, 305],
        },
        {
          name: "Temporal",
          values: [215, 210, 180, 190, 195, 188, 210, 200, 295, 320, 305],
        },
      ],
    },
  ],
};
