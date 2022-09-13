--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 14.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: mascotas_valle; Type: DATABASE; Schema: -; Owner: juan.guzman
--

CREATE DATABASE mascotas_valle WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE mascotas_valle OWNER TO "juan.guzman";

\connect mascotas_valle

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: juan.guzman
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_set_timestamp() OWNER TO "juan.guzman";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categoria; Type: TABLE; Schema: public; Owner: juan.guzman
--

CREATE TABLE public.categoria (
    categ_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    description character varying
);


ALTER TABLE public.categoria OWNER TO "juan.guzman";

--
-- Name: mascota; Type: TABLE; Schema: public; Owner: juan.guzman
--

CREATE TABLE public.mascota (
    mascota_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    description character varying
);


ALTER TABLE public.mascota OWNER TO "juan.guzman";

--
-- Name: pedido_details; Type: TABLE; Schema: public; Owner: juan.guzman
--

CREATE TABLE public.pedido_details (
    pedidodetails_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    proveedor character varying(50) NOT NULL,
    total integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT now(),
    arrived_at timestamp without time zone
);


ALTER TABLE public.pedido_details OWNER TO "juan.guzman";

--
-- Name: pedido_items; Type: TABLE; Schema: public; Owner: juan.guzman
--

CREATE TABLE public.pedido_items (
    pedidoitems_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    detailsid_fk uuid,
    produid_fk character varying(30),
    name character varying(50) NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.pedido_items OWNER TO "juan.guzman";

--
-- Name: producto; Type: TABLE; Schema: public; Owner: juan.guzman
--

CREATE TABLE public.producto (
    prod_id character varying(30) NOT NULL,
    provid_fk uuid,
    name character varying(50) NOT NULL,
    stock integer NOT NULL,
    peso numeric(5,2),
    price integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    categid_fk uuid,
    mascotaid_fk uuid
);


ALTER TABLE public.producto OWNER TO "juan.guzman";

--
-- Name: proveedor; Type: TABLE; Schema: public; Owner: juan.guzman
--

CREATE TABLE public.proveedor (
    prov_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name_prov character varying(50) NOT NULL,
    number bigint NOT NULL,
    other_contact character varying(50)
);


ALTER TABLE public.proveedor OWNER TO "juan.guzman";

--
-- Name: usuario; Type: TABLE; Schema: public; Owner: juan.guzman
--

CREATE TABLE public.usuario (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50),
    email character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    type character(1) NOT NULL,
    password character varying(200) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.usuario OWNER TO "juan.guzman";

--
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: juan.guzman
--

COPY public.categoria (categ_id, name, description) FROM stdin;
032722fa-1f0f-49bc-9b02-e85a90a47c3f	Concentrado	Alimentos para todo tipo de mascota
\.


--
-- Data for Name: mascota; Type: TABLE DATA; Schema: public; Owner: juan.guzman
--

COPY public.mascota (mascota_id, name, description) FROM stdin;
205ea9bc-484b-4b4a-ba15-9a93e9e3ef31	Concentrado	Alimentos para todo tipo de mascota
\.


--
-- Data for Name: pedido_details; Type: TABLE DATA; Schema: public; Owner: juan.guzman
--

COPY public.pedido_details (pedidodetails_id, proveedor, total, created_at, updated_at, arrived_at) FROM stdin;
\.


--
-- Data for Name: pedido_items; Type: TABLE DATA; Schema: public; Owner: juan.guzman
--

COPY public.pedido_items (pedidoitems_id, detailsid_fk, produid_fk, name, quantity, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: juan.guzman
--

COPY public.producto (prod_id, provid_fk, name, stock, peso, price, created_at, updated_at, categid_fk, mascotaid_fk) FROM stdin;
1234567	609e973c-bafc-4afc-9e3f-558d54e0f360	DogChow - Salud Visible Adultos Medianos Y Grandes	3	17.00	149558	2022-08-23 16:23:25.903843	2022-08-23 16:23:25.903843	032722fa-1f0f-49bc-9b02-e85a90a47c3f	205ea9bc-484b-4b4a-ba15-9a93e9e3ef31
5432176	609e973c-bafc-4afc-9e3f-558d54e0f360	DogChow - Salud Visible Adultos Medianos Y Grandes	3	22.70	209850	2022-08-23 16:23:25.909186	2022-08-23 16:23:25.909186	032722fa-1f0f-49bc-9b02-e85a90a47c3f	205ea9bc-484b-4b4a-ba15-9a93e9e3ef31
9876542	609e973c-bafc-4afc-9e3f-558d54e0f360	DogChow - Salud Visible Adultos Medianos Y Grandes	3	22.70	1000000	2022-08-23 16:23:25.909999	2022-08-23 16:23:25.909999	032722fa-1f0f-49bc-9b02-e85a90a47c3f	205ea9bc-484b-4b4a-ba15-9a93e9e3ef31
\.


--
-- Data for Name: proveedor; Type: TABLE DATA; Schema: public; Owner: juan.guzman
--

COPY public.proveedor (prov_id, name_prov, number, other_contact) FROM stdin;
609e973c-bafc-4afc-9e3f-558d54e0f360	Purina	3124445353	purina123@gmail.com
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: juan.guzman
--

COPY public.usuario (user_id, username, email, name, type, password, created_at) FROM stdin;
d01b42a4-e19b-4fd8-bbfe-79547f916cbf	jdelgado	jdelgado@gmail.com	Juan Delgado	A	$2b$10$qmG7QX34NYEGuPM7Ebx18uWm0GBakcnGtlW70EJuIRebwYU.c8u36	2022-09-08 22:58:44.318939
f21b614a-84a1-4b07-893d-ff5494c8926a	kcollazos	kcollazos@gmail.com	Kevin Collazos	T	$2b$10$Io.1Vf9VXS44thKfrhFu9uL2NuMH0IxGZ4F5hTn4DoElBmHROx5W2	2022-09-09 11:42:44.740195
\.


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (categ_id);


--
-- Name: mascota mascota_pkey; Type: CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.mascota
    ADD CONSTRAINT mascota_pkey PRIMARY KEY (mascota_id);


--
-- Name: pedido_details pedido_details_pkey; Type: CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.pedido_details
    ADD CONSTRAINT pedido_details_pkey PRIMARY KEY (pedidodetails_id);


--
-- Name: pedido_items pedido_items_pkey; Type: CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.pedido_items
    ADD CONSTRAINT pedido_items_pkey PRIMARY KEY (pedidoitems_id);


--
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (prod_id);


--
-- Name: proveedor proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (prov_id);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (user_id);


--
-- Name: pedido_details set_timestamp; Type: TRIGGER; Schema: public; Owner: juan.guzman
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.pedido_details FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: pedido_items set_timestamp; Type: TRIGGER; Schema: public; Owner: juan.guzman
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.pedido_items FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: producto fk_categoria; Type: FK CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_categoria FOREIGN KEY (categid_fk) REFERENCES public.categoria(categ_id);


--
-- Name: pedido_items fk_details; Type: FK CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.pedido_items
    ADD CONSTRAINT fk_details FOREIGN KEY (detailsid_fk) REFERENCES public.pedido_details(pedidodetails_id);


--
-- Name: producto fk_mascota; Type: FK CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_mascota FOREIGN KEY (mascotaid_fk) REFERENCES public.mascota(mascota_id);


--
-- Name: pedido_items fk_producto; Type: FK CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.pedido_items
    ADD CONSTRAINT fk_producto FOREIGN KEY (produid_fk) REFERENCES public.producto(prod_id);


--
-- Name: producto fk_proveedor; Type: FK CONSTRAINT; Schema: public; Owner: juan.guzman
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_proveedor FOREIGN KEY (provid_fk) REFERENCES public.proveedor(prov_id);


--
-- PostgreSQL database dump complete
--

