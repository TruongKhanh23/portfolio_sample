module.exports = {
	presets: [
	  ['@babel/preset-env', {
		targets: '> 1%, not dead, not ie 11', // Chỉ định hỗ trợ các trình duyệt hiện đại.
		useBuiltIns: 'entry', // Sử dụng polyfill dựa trên các tính năng thực sự cần thiết.
		corejs: 3, // Đảm bảo sử dụng CoreJS phiên bản 3.
	  }]
	],
  };
  