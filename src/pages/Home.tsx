const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/10 via-purple-500/5 to-pink-500/10 dark:from-apple-blue/20 dark:via-purple-500/10 dark:to-pink-500/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-apple-blue/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-apple-gray-900 dark:text-white mb-6 animate-fade-in">
            探索科技
            <br />
            <span className="bg-gradient-to-r from-apple-blue to-purple-600 bg-clip-text text-transparent">
              创造未来
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-apple-gray-600 dark:text-apple-gray-300 mb-12 max-w-3xl mx-auto animate-slide-up">
            VEX机器人社团致力于培养学生的科技创新能力，通过实践学习，让每个成员都能在机器人技术的世界中发现无限可能
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.3s'}}>
            <button className="btn-primary text-lg px-8 py-4">
              加入我们
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              了解更多
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-apple-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-apple-gray-50 dark:bg-apple-gray-800">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-apple-gray-900 dark:text-white mb-6">
              为什么选择我们
            </h2>
            <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-3xl mx-auto">
              我们提供专业的机器人教育平台，让学生在实践中学习，在竞赛中成长
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-apple-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-apple-blue/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-apple-gray-900 dark:text-white mb-4">
                创新思维
              </h3>
              <p className="text-apple-gray-600 dark:text-apple-gray-300">
                培养学生的创新思维和解决问题的能力，通过机器人项目激发创造力
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-apple-gray-900 dark:text-white mb-4">
                团队协作
              </h3>
              <p className="text-apple-gray-600 dark:text-apple-gray-300">
                在团队项目中学会沟通协作，培养领导力和团队精神
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-apple-gray-900 dark:text-white mb-4">
                竞赛成果
              </h3>
              <p className="text-apple-gray-600 dark:text-apple-gray-300">
                参与各类机器人竞赛，在实战中提升技能，获得荣誉和成就感
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-apple-blue mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-apple-gray-600 dark:text-apple-gray-300">
                活跃成员
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-apple-gray-600 dark:text-apple-gray-300">
                获奖项目
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                8+
              </div>
              <div className="text-apple-gray-600 dark:text-apple-gray-300">
                竞赛参与
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                3年
              </div>
              <div className="text-apple-gray-600 dark:text-apple-gray-300">
                社团历史
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-apple-blue to-purple-600">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            准备好加入我们了吗？
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            无论你是编程新手还是机器人爱好者，我们都欢迎你的加入。让我们一起探索科技的无限可能！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-apple-blue hover:bg-apple-gray-100 px-8 py-4 rounded-full font-medium text-lg transition-all duration-200 hover:scale-105">
              立即报名
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-apple-blue px-8 py-4 rounded-full font-medium text-lg transition-all duration-200">
              了解详情
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home