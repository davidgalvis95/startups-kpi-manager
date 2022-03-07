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
      labelType: "date",
      labels: [
        "ene-21",
        "feb-21",
        "mar-21",
        "apr-21",
        "may-21",
        "jun-21",
        "jul-21",
        "ago-21",
        "sep-21",
        "oct-21",
        "nov-21",
      ],
      chartTypes: ["bar", "ring", "stackedBar", "line"],
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
      labelType: "date",
      labels: [
        "ene-21",
        "feb-21",
        "mar-21",
        "apr-21",
        "may-21",
        "jun-21",
        "jul-21",
        "ago-21",
        "sep-21",
        "oct-21",
        "nov-21",
      ],
      chartTypes: ["bar", "ring", "stackedBar", "line"],
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
