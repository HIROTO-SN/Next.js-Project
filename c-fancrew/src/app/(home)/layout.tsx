import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import React from 'react'

const MainLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
	return (
		<div>
      <Header/>
			<main>{children}</main>
      <Footer/>
		</div>
	)
}

export default MainLayout