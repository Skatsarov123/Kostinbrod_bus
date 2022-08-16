import React from "react";


const AboutUs = () => {

    return (
        <>

            <div className="py-16 bg-white">
                <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div className="md:7/12 lg:w-6/12">
                            <h2 className="bg-gradient-to-r from-red-500 flex justify-center content-center text-white md:text-4xl">ЗА НАС</h2>
                            <p className="mt-6 text-gray-600">
                                Фирмата предлага транспорт в страната и чужбина
                                Специализиран транспорт на служители и ученици
                                Случаен превоз
                                Обществен превоз на пътници по редовни линии</p>

                        </div>
                        <div className="md:5/12 lg:w-5/12">
                            <img src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                                 alt="image" loading="lazy" width="" height=""/>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}

export default AboutUs;

