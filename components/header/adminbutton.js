import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useRouter} from "next/router";

const AdminButton = () => {
	const Router = useRouter();
	return (
		<>
			<Link href={`/admin/${Router.query.slug[0]}`}>
				<div className="container">
					<FontAwesomeIcon icon={faCrown} />
				</div>
			</Link>
			<style jsx>{`
        .container {
          position: relative;
          display: inline-block;
          height: 100%;
          font-size: 1.2em;
          transition: all 0.2s ease-in-out;
          margin-left: 15px;
          bottom: 2px;
        }

        .container:hover {
          cursor: pointer;
          transform: scale(1.2, 1.2);

        }
  `}
			</style>
		</>
	);
};



export default AdminButton;
