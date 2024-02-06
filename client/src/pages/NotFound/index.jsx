import React from 'react';


export const NotFound = () => {
    return (
        <>
        <main className='container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center'>
       
        <div class="error-page-wrap">
		<article class="error-page gradient">
			<hgroup>
				<h1>404</h1>
				<h2>oops! page not found</h2>
			</hgroup>
			<a href="#" title="Back to site" class="error-back">back</a>
		</article>
	</div>
  
        </main>
        </>
    )
}