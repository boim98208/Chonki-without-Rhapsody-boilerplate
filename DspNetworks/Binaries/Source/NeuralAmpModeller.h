#pragma once

// These will improve the readability of the connection definition

#define getT(Idx) template get<Idx>()
#define connectT(Idx, target) template connect<Idx>(target)
#define getParameterT(Idx) template getParameter<Idx>()
#define setParameterT(Idx, value) template setParameter<Idx>(value)
#define setParameterWT(Idx, value) template setWrapParameter<Idx>(value)
using namespace scriptnode;
using namespace snex;
using namespace snex::Types;

namespace NeuralAmpModeller_impl
{
// ==============================| Node & Parameter type declarations |==============================

struct matrix_t_matrix: public routing::static_matrix<2, matrix_t_matrix, false>
{
	static constexpr int channels[2] =
	{
		0, 0
	};
};
using neural1_t_index = runtime_target::indexers::fix_hash<740473403>;

template <int NV>
using NeuralAmpModeller_t_ = container::chain<parameter::empty, 
                                              wrap::fix<2, routing::matrix<matrix_t_matrix>>, 
                                              core::gain<NV>, 
                                              math::neural<NV, neural1_t_index, HpfFrequency::Hz1>, 
                                              core::mono2stereo>;

// =================================| Root node initialiser class |=================================

template <int NV> struct instance: public NeuralAmpModeller_impl::NeuralAmpModeller_t_<NV>
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 0;
		
		SNEX_METADATA_ID(NeuralAmpModeller);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(2)
		{
			0x0000, 0x0000
		};
		SNEX_METADATA_ENCODED_MOD_INFO(2)
		{
			0x3D3B, 0x003E
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& matrix = this->getT(0);      // routing::matrix<matrix_t_matrix>
		auto& gain = this->getT(1);        // core::gain<NV>
		auto& neural1 = this->getT(2);     // math::neural<NV, neural1_t_index, HpfFrequency::Hz1>
		auto& mono2stereo = this->getT(3); // core::mono2stereo
		
		// Default Values --------------------------------------------------------------------------
		
		gain.setParameterT(0, -3.4); // core::gain::Gain
		gain.setParameterT(1, 20.);  // core::gain::Smoothing
		gain.setParameterT(2, 0.);   // core::gain::ResetValue
		
	}
	
	static constexpr bool isPolyphonic() { return NV > 1; };
	
	static constexpr bool hasTail() { return true; };
	
	static constexpr bool isSuspendedOnSilence() { return false; };
	
	void connectToRuntimeTarget(bool addConnection, const runtime_target::connection& c)
	{
		// Runtime target Connections --------------------------------------------------------------
		
		this->getT(2).connectToRuntimeTarget(addConnection, c); // math::neural<NV, neural1_t_index, HpfFrequency::Hz1>
	}
};
}

#undef getT
#undef connectT
#undef setParameterT
#undef setParameterWT
#undef getParameterT
// ======================================| Public Definition |======================================

namespace project
{
// polyphonic template declaration

template <int NV>
using NeuralAmpModeller = wrap::node<NeuralAmpModeller_impl::instance<NV>>;
}


