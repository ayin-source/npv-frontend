export default {
  post: jest.fn(() =>
    Promise.resolve({
      data: [
        { rate: 1.0, npv: 280.00 },
        { rate: 1.25, npv: 279.20 }
      ]
    })
  )
};
